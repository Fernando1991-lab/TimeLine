import area from "@turf/area";
import bbox from "@turf/bbox";
import centerOfMass from "@turf/center-of-mass";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { CURATED_TERRITORIES, translateTerritoryName } from "@/lib/curatedTerritories";

export type TerritoryLabel = {
  name: string;
  color: string;
  lng: number;
  lat: number;
};

type BBox = { minX: number; minY: number; maxX: number; maxY: number };

type LabelCandidate = TerritoryLabel & { area: number; tier: number; bbox: BBox };

export type ViewportBounds = {
  west: number;
  east: number;
  south: number;
  north: number;
};

// The source dataset names sparsely-populated hunter-gatherer/nomadic/
// ethnolinguistic regions the same way it names empires — and those
// regions are often huge, so ranking purely by area buries actual
// states under them. Treat these as lower priority than named
// states/empires, which is what "important" means for this map.
const GENERIC_SOCIETY_PATTERN =
  /hunt(?:er|ing)|forag(?:er|ing)|gatherers?$|nomad|pastoral(?:ist)?s?|shifting cultivators|chiefdoms?$|farmers$|cultures?$|tribes?$|Khoi\w*san|Bant[ou]|Siberians?$|Semites|Austronesians|Dravidians/i;

// Area/centroid/bbox computation (via turf) is the expensive part, so
// it's done once per snapshot and cached by the caller —
// selectVisibleLabels below is the cheap part that can re-run on every
// map pan/zoom.
export function computeLabelCandidates(featureCollection: FeatureCollection): LabelCandidate[] {
  const candidates = featureCollection.features
    .map((feature) => {
      const name = (feature.properties?.NAME ?? feature.properties?.SUBJECTO) as
        | string
        | null
        | undefined;
      if (!name) return null;

      let featureArea: number;
      try {
        featureArea = area(feature as Feature<Geometry>);
      } catch {
        return null;
      }
      if (!featureArea) return null;

      let lng: number, lat: number;
      let box: BBox;
      try {
        const center = centerOfMass(feature as Feature<Geometry>);
        [lng, lat] = center.geometry.coordinates;
        const [minX, minY, maxX, maxY] = bbox(feature as Feature<Geometry>);
        box = { minX, minY, maxX, maxY };
      } catch {
        return null;
      }

      const color = (feature.properties?.__color as string) ?? "#c9c9c9";
      const isCurated = name in CURATED_TERRITORIES;
      const isGenericSociety = !isCurated && GENERIC_SOCIETY_PATTERN.test(name);
      const tier = isCurated ? 0 : isGenericSociety ? 2 : 1;
      return {
        name: translateTerritoryName(name),
        color,
        lng,
        lat,
        area: featureArea,
        tier,
        bbox: box,
      };
    })
    .filter((candidate): candidate is LabelCandidate => candidate !== null);

  candidates.sort((a, b) => (a.tier !== b.tier ? a.tier - b.tier : b.area - a.area));
  return candidates;
}

// More labels appear as you zoom in — a world view can only fit ~12
// readable names, but zoomed into one continent there's room (and
// interest) for many more, including smaller-but-important states that
// would otherwise never win a global by-area ranking (e.g. Babylonia
// next to much larger contemporary steppe territories).
export function labelLimitForZoom(zoom: number): number {
  if (zoom < 2.2) return 12;
  if (zoom < 3.2) return 28;
  if (zoom < 4.4) return 50;
  return 90;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// A territory only needs to *overlap* the viewport to be worth a label —
// otherwise a huge territory whose centroid sits far outside the current
// view (because you're zoomed into just one edge of it) never gets one,
// even though most of the screen is that territory's color.
function bboxIntersectsBounds(box: BBox, bounds: ViewportBounds): boolean {
  if (bounds.west <= bounds.east) {
    return box.minX <= bounds.east && box.maxX >= bounds.west && box.minY <= bounds.north && box.maxY >= bounds.south;
  }
  // Viewport crosses the antimeridian (west > east).
  return (box.minX <= bounds.east || box.maxX >= bounds.west) && box.minY <= bounds.north && box.maxY >= bounds.south;
}

// Places the label at the centroid when it's already visible, or at the
// nearest point still inside both the viewport and the territory's own
// bounding box otherwise — so the label always lands somewhere on
// screen, roughly "towards" the true centroid.
function labelPositionInView(candidate: LabelCandidate, bounds: ViewportBounds) {
  const west = Math.max(candidate.bbox.minX, bounds.west);
  const east = Math.min(candidate.bbox.maxX, bounds.east);
  const south = Math.max(candidate.bbox.minY, bounds.south);
  const north = Math.min(candidate.bbox.maxY, bounds.north);
  return {
    lng: clamp(candidate.lng, Math.min(west, east), Math.max(west, east)),
    lat: clamp(candidate.lat, Math.min(south, north), Math.max(south, north)),
  };
}

// Only the largest/most important territories currently on screen get a
// label — enough to read as "which empire/people controls this region"
// without turning small city-states and enclaves into unreadable
// clutter. Curated entries (see curatedTerritories.ts) always outrank
// the area-based heuristic.
//
// `bounds` (padded, for the inclusion test) and `clampBounds` (the
// actual on-screen viewport, for placement) are deliberately separate:
// clamping into the padded box would let a label land in the padding
// margin, which is off-screen.
export function selectVisibleLabels(
  candidates: LabelCandidate[],
  {
    limit,
    bounds,
    clampBounds,
  }: { limit: number; bounds?: ViewportBounds; clampBounds?: ViewportBounds }
): TerritoryLabel[] {
  const visible = bounds
    ? candidates.filter((candidate) => bboxIntersectsBounds(candidate.bbox, bounds))
    : candidates;
  const positionBounds = clampBounds ?? bounds;

  return visible.slice(0, limit).map((candidate) => {
    const { lng, lat } = positionBounds ? labelPositionInView(candidate, positionBounds) : candidate;
    return { name: candidate.name, color: candidate.color, lng, lat };
  });
}
