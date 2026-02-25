export function getISODate(date = new Date()): string {
  // Use the *local* calendar date (not UTC) to avoid timezone off-by-one.
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
