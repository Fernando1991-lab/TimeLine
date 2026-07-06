import area from "@turf/area";
import centerOfMass from "@turf/center-of-mass";
import type { Feature, FeatureCollection, Geometry } from "geojson";

export type TerritoryLabel = {
  name: string;
  color: string;
  lng: number;
  lat: number;
};

// The source dataset names sparsely-populated hunter-gatherer/nomadic
// regions the same way it names empires — and those regions are often
// huge, so ranking purely by area buries actual states under them.
// Treat these generic society labels as lower priority than named
// states/empires, which is what "important" means for this map.
const GENERIC_SOCIETY_PATTERN =
  /hunter-gatherer|forager|nomad|pastoral|shifting cultivators|chiefdoms?$/i;

// Only the largest territories get a label — enough to read as "which
// empire/people controls this region" without turning small city-states
// and enclaves into unreadable clutter.
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
      const isGenericSociety = GENERIC_SOCIETY_PATTERN.test(name);
      return { name, color, lng, lat, area: featureArea, isGenericSociety };
    })
    .filter(
      (candidate): candidate is TerritoryLabel & { area: number; isGenericSociety: boolean } =>
        candidate !== null
    );

  candidates.sort((a, b) => {
    if (a.isGenericSociety !== b.isGenericSociety) {
      return a.isGenericSociety ? 1 : -1;
    }
    return b.area - a.area;
  });
  return candidates
    .slice(0, limit)
    .map(({ name, color, lng, lat }) => ({ name, color, lng, lat }));
}
