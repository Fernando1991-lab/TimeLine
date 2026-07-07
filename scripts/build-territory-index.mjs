// Regenerates public/data/historical-basemaps/territory-index.json: for
// every named territory across all snapshots, the single year where it
// had its largest extent (its "peak"), plus a centroid to fly the map
// to. Powers the search box (src/components/TerritorySearch.tsx) — pick
// a result, jump straight to its most prominent era and location.
// Run after adding/removing a year or editing a snapshot:
// `node scripts/build-territory-index.mjs`.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import area from "@turf/area";

const dir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "data",
  "historical-basemaps"
);

const manifest = JSON.parse(readFileSync(path.join(dir, "manifest.json"), "utf8"));

// Mean of all vertices — robust across concave/multi-part geometries.
// (@turf/center-of-mass can return out-of-range lng/lat for some
// concave rings in this dataset; see colonialLabelPosition in
// EmpireMap.tsx for the same fix applied to the colonial overlay.)
function centroid(geometry) {
  const positions = [];
  const collect = (coords) => {
    if (!Array.isArray(coords)) return;
    if (typeof coords[0] === "number" && typeof coords[1] === "number") {
      positions.push(coords);
    } else {
      coords.forEach(collect);
    }
  };
  if (geometry && "coordinates" in geometry) collect(geometry.coordinates);
  if (positions.length === 0) return null;
  let sumLng = 0;
  let sumLat = 0;
  for (const [lng, lat] of positions) {
    sumLng += lng;
    sumLat += lat;
  }
  const lng = sumLng / positions.length;
  const lat = sumLat / positions.length;
  if (!isFinite(lng) || !isFinite(lat) || lat < -90 || lat > 90) return null;
  return [lng, lat];
}

const peaks = new Map(); // name -> { name, year, lng, lat, area }

for (const { year, file } of manifest) {
  const geojson = JSON.parse(readFileSync(path.join(dir, file), "utf8"));
  for (const feature of geojson.features) {
    const name = feature.properties?.NAME ?? feature.properties?.SUBJECTO ?? null;
    // Skip source-data encoding garbage ("?", "1", whitespace-only) —
    // not real names, just noise in the search results.
    if (!name || name.trim().length < 2 || !/\p{L}/u.test(name)) continue;
    let featureArea;
    try {
      featureArea = area(feature);
    } catch {
      continue;
    }
    if (!featureArea) continue;
    const pos = centroid(feature.geometry);
    if (!pos) continue;
    const existing = peaks.get(name);
    if (!existing || featureArea > existing.area) {
      peaks.set(name, { name, year, lng: pos[0], lat: pos[1], area: featureArea });
    }
  }
}

const entries = [...peaks.values()]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(({ name, year, lng, lat }) => ({
    name,
    year,
    lng: Math.round(lng * 1000) / 1000,
    lat: Math.round(lat * 1000) / 1000,
  }));

const outPath = path.join(dir, "territory-index.json");
writeFileSync(outPath, JSON.stringify(entries) + "\n");
console.log(`Wrote ${entries.length} territory entries to ${outPath}`);
