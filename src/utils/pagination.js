/**
 * Pagination Utilities
 *
 * Responsibilities:
 *  - Parse and normalize pagination query parameters
 *  - Enforce numeric bounds (min/max)
 *  - Compute offset from page + limit
 *
 * This module is HTTP-aware (expects query-style input),
 * but it does NOT depend on Express directly.
 *
 * Used in controllers before calling repositories.
 */
import { badRequest } from "#utils/httpErrors";

/**
 * Parses pagination parameters from query objects.
 *
 *  * Defaults:
 *  - limit: 20
 *  - page: 1
 *
 * Enforces:
 *  - limit max of 100
 *  - limit minimum of 1
 *  - page minimum of 1
 *
 * @param {{ limit?: string|number, page?: string|number }} [query]
 * @returns {{ limit: number, page: number, offset: number }}
 */

export function parsePagination(query = {}) {
    const rawLimit = query.limit ?? 20;
    const rawPage = query.page ?? 1;

    const parsedLimit = Number(rawLimit);

    if (parsedLimit > 100) {
        throw badRequest('Limit cannot exceed 100');
    }

    const limit = clampInt(rawLimit, 1, 100, 20);
    const page = clampInt(rawPage, 1, Number.MAX_SAFE_INTEGER, 1);

    const offset = (page - 1) * limit;

    return { limit, page, offset};

}
/**
 * Clamps a value to an integer within a given range.
 *
 * - Converts input to Number
 * - Truncates decimals
 * - Falls back if not finite
 *
 * @param {string|number} value
 * @param {number} min
 * @param {number} max
 * @param {number} fallback
 * @returns {number}
 */
function clampInt(value, min, max, fallback) {
    const n = Number(value);

    if (!Number.isFinite(n)) return fallback;

    const i = Math.trunc(n);
    if (i < min) return min;
    if (i > max) return max;
    return i;
}
