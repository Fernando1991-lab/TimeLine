import area from "@turf/area";
import centerOfMass from "@turf/center-of-mass";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { CURATED_TERRITORIES, translateTerritoryName } from "@/lib/curatedTerritories";

export type TerritoryLabel = {
  name: string;
  color: string;
  lng: number;
  lat: number;
};

type LabelCandidate = TerritoryLabel & { area: number; tier: number };

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

// Area/centroid computation (via turf) is the expensive part, so it's
// done once per snapshot and cached by the caller — selectVisibleLabels
// below is the cheap part that can re-run on every map pan/zoom.
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
      try {
        const center = centerOfMass(feature as Feature<Geometry>);
        [lng, lat] = center.geometry.coordinates;
      } catch {
        return null;
      }

      const color = (feature.properties?.__color as string) ?? "#c9c9c9";
      const isCurated = name in CURATED_TERRITORIES;
      const isGenericSociety = !isCurated && GENERIC_SOCIETY_PATTERN.test(name);
      const tier = isCurated ? 0 : isGenericSociety ? 2 : 1;
      return { name: translateTerritoryName(name), color, lng, lat, area: featureArea, tier };
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

function isWithinBounds(lng: number, lat: number, bounds: ViewportBounds): boolean {
  if (bounds.west <= bounds.east) {
    return lng >= bounds.west && lng <= bounds.east && lat >= bounds.south && lat <= bounds.north;
  }
  // Viewport crosses the antimeridian (west > east).
  return (lng >= bounds.west || lng <= bounds.east) && lat >= bounds.south && lat <= bounds.north;
}

// Only the largest/most important territories currently on screen get a
// label — enough to read as "which empire/people controls this region"
// without turning small city-states and enclaves into unreadable
// clutter. Curated entries (see curatedTerritories.ts) always outrank
// the area-based heuristic.
export function selectVisibleLabels(
  candidates: LabelCandidate[],
  { limit, bounds }: { limit: number; bounds?: ViewportBounds }
): TerritoryLabel[] {
  const visible = bounds
    ? candidates.filter((candidate) => isWithinBounds(candidate.lng, candidate.lat, bounds))
    : candidates;

  return visible.slice(0, limit).map(({ name, color, lng, lat }) => ({ name, color, lng, lat }));
}
