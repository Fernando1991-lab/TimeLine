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

// Classic edit distance, used only as a typo-tolerant fallback below --
// names in this dataset are ancient/obscure enough ("Babilonia",
// "Assiria") that a small misspelling shouldn't return an empty dropdown.
function levenshtein(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dist: number[] = new Array(rows * cols);
  for (let i = 0; i < rows; i++) dist[i * cols] = i;
  for (let j = 0; j < cols; j++) dist[j] = j;
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dist[i * cols + j] = Math.min(
        dist[(i - 1) * cols + j] + 1,
        dist[i * cols + j - 1] + 1,
        dist[(i - 1) * cols + j - 1] + cost
      );
    }
  }
  return dist[rows * cols - 1];
}

// A query this far off (in edits) from a candidate word is still
// considered a plausible typo; scales with query length so short
// queries don't match almost anything.
function fuzzyThreshold(length: number): number {
  if (length <= 4) return 1;
  if (length <= 8) return 2;
  return 3;
}

export function searchTerritories(
  index: TerritoryIndexEntry[],
  query: string,
  limit = 8
): TerritorySearchResult[] {
  const q = normalize(query.trim());
  if (!q) return [];
  const substringMatches: { entry: TerritoryIndexEntry; displayName: string; rank: number }[] = [];
  const fuzzyMatches: { entry: TerritoryIndexEntry; displayName: string; dist: number }[] = [];
  const threshold = fuzzyThreshold(q.length);

  for (const entry of index) {
    const displayName = translateTerritoryName(entry.name);
    const normalized = normalize(displayName);
    const at = normalized.indexOf(q);
    if (at !== -1) {
      // Prefix matches ("port" -> "Portugal") rank above matches in the
      // middle of a name ("port" -> "Reino Unido de Portugal e ...").
      substringMatches.push({ entry, displayName, rank: at === 0 ? 0 : 1 });
      continue;
    }
    // Only bother with the fuzzy pass for names that didn't already
    // substring-match -- compare the query against each word (so a typo
    // in "Babilonia" still matches inside a longer multi-word name).
    let bestDist = Infinity;
    for (const word of normalized.split(/[^a-z0-9]+/)) {
      if (!word) continue;
      if (Math.abs(word.length - q.length) > threshold) continue;
      const dist = levenshtein(q, word);
      if (dist < bestDist) bestDist = dist;
    }
    if (bestDist <= threshold) {
      fuzzyMatches.push({ entry, displayName, dist: bestDist });
    }
  }

  substringMatches.sort((a, b) => a.rank - b.rank || a.displayName.localeCompare(b.displayName));
  fuzzyMatches.sort((a, b) => a.dist - b.dist || a.displayName.localeCompare(b.displayName));

  const combined = [...substringMatches, ...fuzzyMatches];
  return combined.slice(0, limit).map(({ entry, displayName }) => ({ ...entry, displayName }));
}
