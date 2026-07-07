import { translateTerritoryName } from "@/lib/curatedTerritories";

// One entry per named territory in the dataset: the year/place where it
// had its largest extent, so picking a search result can jump straight
// to its most prominent era. Built by scripts/build-territory-index.mjs
// from the historical-basemaps snapshots (see that file for details).
export type TerritoryIndexEntry = {
  name: string; // original GeoJSON NAME/SUBJECTO — matches CURATED_TERRITORIES keys
  year: number;
  lng: number;
  lat: number;
};

export type TerritorySearchResult = TerritoryIndexEntry & { displayName: string };

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function searchTerritories(
  index: TerritoryIndexEntry[],
  query: string,
  limit = 8
): TerritorySearchResult[] {
  const q = normalize(query.trim());
  if (!q) return [];
  const matches: { entry: TerritoryIndexEntry; displayName: string; rank: number }[] = [];
  for (const entry of index) {
    const displayName = translateTerritoryName(entry.name);
    const normalized = normalize(displayName);
    const at = normalized.indexOf(q);
    if (at === -1) continue;
    // Prefix matches ("port" -> "Portugal") rank above matches in the
    // middle of a name ("port" -> "Reino Unido de Portugal e ...").
    const rank = at === 0 ? 0 : 1;
    matches.push({ entry, displayName, rank });
  }
  matches.sort((a, b) => a.rank - b.rank || a.displayName.localeCompare(b.displayName));
  return matches.slice(0, limit).map(({ entry, displayName }) => ({ ...entry, displayName }));
}
