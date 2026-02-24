/**
 * Auth Routes
 *
 * Mounts authentication endpoints:
 * - POST /auth/register
 * - POST /auth/login
 *
 * Applies:
 * - requireJson middleware
 * - Field validation guard
 *
 * Phase: 1
 */

import { Router } from 'express';
import { registerUser, loginUser } from '#controllers/auth.controller';
import { requireJson } from '#middleware/requireJson';

export const authRouter = Router();

authRouter.post('/register', requireJson, registerUser);
authRouter.post('/login', requireJson, loginUser);
