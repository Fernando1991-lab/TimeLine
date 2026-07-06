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

// The source dataset names sparsely-populated hunter-gatherer/nomadic/
// ethnolinguistic regions the same way it names empires — and those
// regions are often huge, so ranking purely by area buries actual
// states under them. Treat these as lower priority than named
// states/empires, which is what "important" means for this map.
const GENERIC_SOCIETY_PATTERN =
  /hunter|forager|gatherers?$|nomad|pastoral(?:ist)?s?|shifting cultivators|chiefdoms?$|farmers$|cultures?$|tribes?$|Khoi\w*san|Bant[ou]|Siberians?$|Semites|Austronesians|Dravidians/i;

// Only the largest territories get a label — enough to read as "which
// empire/people controls this region" without turning small city-states
// and enclaves into unreadable clutter. Curated entries (see
// curatedTerritories.ts) always outrank the area-based heuristic, so
// historically important-but-small states aren't crowded out by huge
// hunter-gatherer/nomadic regions.
export function topTerritoryLabels(
  featureCollection: FeatureCollection,
  limit: number
): TerritoryLabel[] {
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
      return { name, color, lng, lat, area: featureArea, tier };
    })
    .filter(
      (candidate): candidate is TerritoryLabel & { area: number; tier: number } =>
        candidate !== null
    );

  candidates.sort((a, b) => (a.tier !== b.tier ? a.tier - b.tier : b.area - a.area));

  return candidates
    .slice(0, limit)
    .map(({ name, color, lng, lat }) => ({ name: translateTerritoryName(name), color, lng, lat }));
}
