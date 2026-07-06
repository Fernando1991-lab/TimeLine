// Regenerates public/data/historical-basemaps/manifest.json from the
// world_*.geojson snapshots checked into that folder. Run after adding
// or removing a year: `node scripts/build-manifest.mjs`.
import { readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "data",
  "historical-basemaps"
);

function yearFromFilename(name) {
  const match = /^world_(bc)?(\d+)\.geojson$/.exec(name);
  if (!match) return null;
  const [, bc, digits] = match;
  const value = Number(digits);
  return bc ? -value : value;
}

function labelFromYear(year) {
  return year < 0 ? `${-year} a.C.` : `${year} d.C.`;
}

const entries = readdirSync(dir)
  .filter((name) => name.endsWith(".geojson") && name.startsWith("world_"))
  .map((file) => {
    const year = yearFromFilename(file);
    if (year === null) return null;
    return { year, label: labelFromYear(year), file };
  })
  .filter(Boolean)
  .sort((a, b) => a.year - b.year);

const manifestPath = path.join(dir, "manifest.json");
writeFileSync(manifestPath, JSON.stringify(entries, null, 2) + "\n");
console.log(`Wrote ${entries.length} snapshots to ${manifestPath}`);
