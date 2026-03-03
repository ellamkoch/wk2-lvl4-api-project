/**
 * errorHandler middleware
 * -----------------------
 * Global Express error handler.
 * Ensures all errors return a consistent JSON error envelope.
 *
 * Error envelope:
 * {
 *   ok: false,
 *   requestId,
 *   error: { code, message, details? }
 * }
 *
 * @param {Error} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {void}
 */

import { HttpError } from '#utils/httpErrors';

export function errorHandler(err, req, res, _next) {
  console.error(err);

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      ok: false,
      requestId: req.requestId,
      error: {
        message: err.message,
        code: err.code,
        ...(err.details !== undefined ? { details: err.details } : {}),
      },
    });
  }

  return res.status(500).json({
    ok: false,
    requestId: req.requestId,
    error: {
      message: 'Internal Server Error',
      code: 'internal_error',
    },
  });
}
