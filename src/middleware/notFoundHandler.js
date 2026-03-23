/**
 * notFoundHandler middleware
 * --------------------------
 * Runs after all routes.
 * Converts unmatched requests into a standardized 404 HttpError
 * so the global errorHandler can return a consistent error envelope.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {void}
 */

import { notFound } from '#utils/httpErrors';

/**
 * Runs after all routes. Produces a consistent 404 response.
 */
export function notFoundHandler(req, _res, next) {
  next(notFound(`Route not found: ${req.method} ${req.path}`)); //next tells express to skip normal route handling and go to the error middleware.
}
