/**
 * Auth Controller (Phase 2 - Prisma Backed)
 *
 * Responsibilities:
 * - Handle user registration and login
 * - Validate required fields (email, password)
 * - Hash passwords using bcrypt
 * - Issue JWT tokens on successful authentication
 * - Return standardized response envelopes
 *
 * Dependencies:
 * - Relies on Prisma-backed `users` repository for persistence
 *
 * This controller does NOT:
 * - Handle role-based access
 * - Implement refresh tokens
 */

import { conflict, unauthorized } from '#utils/httpErrors';
import { ensureFields } from '#utils/ensureFieldsGuard';
import { hashPassword, verifyPassword } from '#utils/password';
import { signToken } from '#utils/jwt';

/**
 * Register a new user.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 *
 * Expected body:
 * { email: string, password: string }
 *
 * Returns:
 * 201 with JWT token if successful
 *
 * Throws:
 * - VALIDATION_ERROR (400)
 */

export async function registerUser(req, res) {
  const { users } = res.locals.repos;

  ensureFields(req.body, ['email', 'password']);

  const email = String(req.body.email).toLowerCase().trim();
  const password = String(req.body.password).trim();

  //checking for duplicate emails

  const userExists = await users.findByEmail(email);

  if (userExists) {
    throw conflict('Email already registered');
  }

  const user = await users.create({
    email,
    passwordHash: hashPassword(password),
  });

  const token = signToken({ userId: user.id, secret: req.app.locals.config.JWT_SECRET });

  return res.created({
    token,
    user: { id: user.id, email: user.email },
  });
}

/**
 * Authenticate an existing user.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 *
 * Expected body:
 * { email: string, password: string }
 *
 * Returns:
 * 200 with JWT token if credentials are valid
 *
 * Throws:
 * - UNAUTHORIZED (401) if invalid credentials
 */

export async function loginUser(req, res) {
  const { users } = res.locals.repos;

  ensureFields(req.body, ['email', 'password']);

  const email = String(req.body.email).toLowerCase().trim();
  const password = String(req.body.password).trim();

  const user = await users.findByEmail(email);

  if (!user) {
    throw unauthorized('Invalid credentials');
  }

  if (!verifyPassword(password, user.passwordHash)) {
    throw unauthorized('Invalid credentials');
  }

  const token = signToken({ userId: user.id, secret: req.app.locals.config.JWT_SECRET });

  return res.ok({
    token,
    user: { id: user.id, email: user.email },
  });
}
