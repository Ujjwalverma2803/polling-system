export function formatSeconds(value: number): string {
  const safeValue = Number.isFinite(value) ? Math.max(0, value) : 0;
  const minutes = Math.floor(safeValue / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(safeValue % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export function getVotePercentage(count: number, total: number): number {
  if (!total) return 0;
  return Math.round((count / total) * 100);
}

export function classNames(...items: Array<string | false | null | undefined>): string {
  return items.filter(Boolean).join(" ");
}
