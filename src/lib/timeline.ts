export type TimelineSnapshot = {
  year: number;
  label: string;
  file: string;
};

export function yearLabel(year: number): string {
  return year < 0 ? `${-year} a.C.` : `${year} d.C.`;
}

export function nearestSnapshotIndex(
  snapshots: TimelineSnapshot[],
  year: number
): number {
  let closest = 0;
  let closestDiff = Infinity;
  snapshots.forEach((snapshot, index) => {
    const diff = Math.abs(snapshot.year - year);
    if (diff < closestDiff) {
      closestDiff = diff;
      closest = index;
    }
  });
  return closest;
}
