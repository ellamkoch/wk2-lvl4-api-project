/**
 * applyWindow
 * Slices an array using optional limit + offset.
 * Expects limit/offset to already be numbers (controller parses query).
 */
export function applyWindow(items, { limit, offset } = {}) {
  const safeOffset = Number.isFinite(offset) && offset > 0 ? offset : 0;

  // limit is optional: if missing, return everything after offset
  if (!Number.isFinite(limit)) return items.slice(safeOffset);

  const safeLimit = Math.max(0, Math.trunc(limit));
  return items.slice(safeOffset, safeOffset + safeLimit);
}
