/**
 * errorHandler Middleware (Phase 2 - Prisma Errors)
 * -------------------------------------------------
 * Global Express error handler that normalizes errors into a consistent
 * JSON envelope. Now includes Prisma-specific error mapping for database
 * constraint violations and common database errors.
 *
 * Error Handling Order:
 *  1. Prisma.PrismaClientKnownRequestError → mapped to HttpError
 *  2. HttpError instances → serialized as-is
 *  3. Generic errors → logged and returned as internal error
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
import { Prisma } from '../../generated/prisma/index.js';
import { HttpError } from '#utils/httpErrors';

/**
 * Send a standardized error response.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {number} status     HTTP status code.
 * @param {string} code       Error code (e.g., 'not_found', 'unique_constraint').
 * @param {string} message    Human-readable error message.
 * @param {Object|null} details  Optional additional error details.
 * @returns {import("express").Response}
 */
function sendError(req, res, status, code, message, details = null) {
  return res.status(status).json({
    ok: false,
    error: {
      code,
      message,
      details: details ?? null,
      requestId: req.requestId,
    },
  });
}

/**
 * Map Prisma-specific database errors to HttpError instances.
 *
 * Handles common Prisma error codes:
 *  - P2002: Unique constraint violation
 *  - P2003: Foreign key constraint violation
 *  - P2025: Record not found
 *  - Default: Generic database error
 *
 * @param {Error} err
 * @returns {HttpError|null}  Returns HttpError if Prisma error, null otherwise.
 */
function mapPrismaError(err) {
  if (!(err instanceof Prisma.PrismaClientKnownRequestError)) return null;

  switch (err.code) {
    case 'P2002':
      return new HttpError(
        409,
        'unique_constraint',
        'A record with these unique fields already exists.',
        err.meta ?? null,
      );

    case 'P2003':
      return new HttpError(
        409,
        'foreign_key_constraint',
        'A related record was not found (foreign key constraint).',
        err.meta ?? null,
      );

    case 'P2025':
      return new HttpError(404, 'record_not_found', 'Record not found.', err.meta ?? null);

    default:
      return new HttpError(500, 'database_error', 'A database error occurred.', err.meta ?? null);
  }
}

/**
 * Global error handler for Express.
 *
 * Attempts Prisma error mapping first, then checks for HttpError instances,
 * and finally catches generic errors. All responses follow the standard
 * error envelope format with requestId for tracing.
 *
 * @param {Error} err       The caught error.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 * @returns {void}
 */
export function errorHandler(err, req, res, _next) {
  const prismaMapped = mapPrismaError(err);
  if (prismaMapped) {
    return sendError(
      req,
      res,
      prismaMapped.status,
      prismaMapped.code,
      prismaMapped.message,
      prismaMapped.details,
    );
  }

  if (err instanceof HttpError) {
    return sendError(req, res, err.status, err.code, err.message, err.details);
  }

  console.error(err);

  return sendError(req, res, 500, 'internal_error', 'Internal Server Error', null);
}
