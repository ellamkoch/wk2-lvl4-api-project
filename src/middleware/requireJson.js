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

import { unsupportedMediaType, badRequest } from '#utils/httpErrors';


export function requireJson(req, _res, next) {
  if (['POST', 'PUT', 'PATCH'].includes(req.method) && !req.is('application/json')) {
    return next(unsupportedMediaType('Content-Type must be application/json'));
  } // need if statement here for extra validation to do the body and the user is sending json.
  //this validates that the body being sent back is an object. It also looks to see if the body length is equal to 0. If the body is not an object or the body length of the object is = 0, it returns a 400 bad request 
  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    return next(badRequest('Body is empty'));
  }
  next();
}
