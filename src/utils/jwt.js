/**
 * JWT Utility
 *
 * Responsibilities:
 * - Sign JWT tokens
 * - Verify JWT tokens
 * - Encapsulate jsonwebtoken usage
 *
 * Keeps token logic centralized to allow future changes
 * (e.g., expiration, algorithm changes).
 *
 * Phase: 1
 */
import jwt from 'jsonwebtoken';

/**
 * Sign a JWT token for a user.
 *
 * @param {string} userId
 * @returns {string} JWT token
 */

export function signToken({ userId, secret }) {
  return jwt.sign({ sub: userId }, secret, { expiresIn: '12h' });
}
/**
 * Verify and decode a JWT token.
 *
 * @param {string} token
 * @returns {{ sub: string }}
 * @throws {Error} if invalid
 */

export function verifyToken({ token, secret }) {
  return jwt.verify(token, secret);
}
