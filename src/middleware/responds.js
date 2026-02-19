/**
 * Response Middleware
 * -------------------
 * Attaches standardized response helpers to the Express response object.
 *
 * Enforces a consistent success envelope across the API:
 *
 * Success:
 * {
 *   ok: true,
 *   requestId,
 *   data,
 *   meta? (optional)
 * }
 *
 * Why this exists:
 * - Keeps controllers clean (res.ok / res.created / res.noContent)
 * - Prevents ad-hoc JSON responses
 * - Ensures consistent structure for all successful responses
 * - Automatically includes requestId for traceability
 *
 * Note:
 * - HTTP status codes remain the source of truth.
 * - Errors are handled separately in the global errorHandler middleware.
 */

/**
 * Adds response helper methods to res.
 *
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 */


export function respond(req, res, next) {

    res.ok = (data, meta) => res.status(200).json({ ok: true, requestId: req.requestId, data, ... meta ? { meta } : {} });

    res.created = (data, meta) => res.status(201).json({ ok: true, requestId: req.requestId, data, ... meta ? { meta }: {} });

    res.noContent = () => res.status(204).send();

    next();
}
