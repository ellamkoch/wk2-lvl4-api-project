/**
 * Middleware that ensures every request has a unique request ID.
 *
 * Behavior:
 * - Reuses incoming "X-Request-Id" header if present
 * - Otherwise generates a UUID using crypto.randomUUID()
 * - Attaches the value to req.requestId
 * - Sets the same value on the response header "X-Request-Id"
 *
 * This enables request tracing, log correlation, and production-ready
 * debugging without adding additional complexity.
 *
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 * @returns {void}
 */

import crypto from 'crypto';

export function requestId(req, res, next) {
  const incomingId = req.get('X-Request-Id');

  const id = incomingId || crypto.randomUUID();

  req.requestId = id;
  res.setHeader('X-Request-Id', id);

  next();
}
