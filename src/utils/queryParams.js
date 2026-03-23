/**
 * Query Parameter Utilities
 *
 * Responsibilities:
 *  - Normalize and parse common query parameter patterns
 *  - Convert string inputs into structured values
 *
 * These helpers are used in controllers to:
 *  - Keep parsing logic consistent
 *  - Avoid duplicating string/boolean/CSV handling
 *
 * This module does NOT:
 *  - Access Express directly
 *  - Throw HTTP errors
 */

/**
 * Parses a boolean-like query value.
 *
 * Accepts:
 *  - "true", "1" → true
 *  - anything else → false
 *
 * @param {unknown} value
 * @returns {boolean}
 */

export function parseBoolean(value) {
  if (typeof value !== 'string') return false;
  const v = value.trim().toLowerCase();
  return v === 'true' || v === '1';
}

/**
 * Parses a CSV string into a Set of lowercase trimmed values.
 *
 * Example:
 *  "comments,author" → Set { "comments", "author" }
 *
 * Non-string values return an empty Set.
 *
 * @param {unknown} value
 * @returns {Set<string>}
 */
export function parseCsvSet(value) {
  if (typeof value !== 'string') return new Set();
  return new Set(
    value
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  );
}
