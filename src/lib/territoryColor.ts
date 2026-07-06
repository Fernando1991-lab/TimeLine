// Deterministic color per territory name so the same empire/people keeps
// roughly the same hue as you scrub across snapshots (names are not
// perfectly stable across the source dataset, but this is a reasonable
// approximation without a curated color table).
const PALETTE = [
  "#e07a5f", "#3d5a80", "#81b29a", "#f2cc8f", "#9d8189",
  "#457b9d", "#e76f51", "#606c38", "#bc6c25", "#4a4e69",
  "#2a9d8f", "#e9c46a", "#6d597a", "#355070", "#b56576",
  "#8ecae6", "#219ebc", "#ffb703", "#fb8500", "#6a994e",
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function colorForTerritory(name: string | null | undefined): string {
  if (!name) return "#c9c9c9";
  return PALETTE[hashString(name) % PALETTE.length];
}
