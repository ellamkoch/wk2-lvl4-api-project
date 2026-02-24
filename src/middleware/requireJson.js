/**
 * requireJson middleware
 * ----------------------
 * Enforces JSON Content-Type for body-carrying requests.
 * For POST/PUT/PATCH: requires `Content-Type: application/json`.
 * For other methods: does nothing.
 *
 * For invalid/missing JSON Content-Type, forwards a 415 HttpError.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {void}
 */

import { unsupportedMediaType } from '#utils/httpErrors';

export function requireJson(req, _res, next) {
  if (['POST', 'PUT', 'PATCH'].includes(req.method) && !req.is('application/json')) {
    return next(unsupportedMediaType('Content-Type must be application/json'));
  }
  next();
}
