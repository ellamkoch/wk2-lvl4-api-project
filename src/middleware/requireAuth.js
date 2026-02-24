/**
 * requireAuth Middleware
 *
 * Responsibilities:
 * - Require Authorization: Bearer <token>
 * - Verify JWT signature
 * - Attach authenticated user identity to req.user
 * - Normalize invalid/missing token errors
 *
 * Phase: 1
 */
/**
 * Protects routes by enforcing JWT authentication.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

import { unauthorized } from '#utils/httpErrors';
import { verifyToken } from '#utils/jwt';

export function requireAuth(req, _res, next) {
  const header = req.headers.authorization ?? '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(unauthorized('Missing Bearer token'));
  }

  try {
    const secret = req.app.locals.config.JWT_SECRET;
    const payload = verifyToken({ token, secret });

    req.user = { id: payload.sub };
    return next();
  } catch {
    return next(unauthorized('Invalid token'));
  }
}
