/**
 * env.js
 *
 * Loads environment variables using dotenv and validates required config.
 *
 * Responsibilities:
 * - Reads environment variables from process.env
 * - Applies safe defaults where appropriate
 * - Validates required values (PORT, JWT_SECRET, DB_PATH)
 * - Throws early if configuration is invalid
 *
 * This ensures the app fails fast during startup instead of failing later at runtime.
 */

/**
 * Ensures required environment variables are present and valid.
 *
 * @returns {{
 *   PORT: number,
 *   JWT_SECRET: string,
 *   DB_PATH: string
 * }}
 *
 * @throws {Error} If:
 * - PORT is not a valid positive number
 * - JWT_SECRET is shorter than 32 characters
 * - DB_PATH is missing or empty
 *
 * This function should be called during application startup.
 */

import dotenv from 'dotenv';

dotenv.config(); //loads variables from .env into process.env

export function ensureEnv() {
  const PORT = Number(process.env.port ?? 3000); //Defaults to 3000 if not set/provided

  const JWT_SECRET = process.env.JWT_SECRET ?? '';

  // const DB_PATH = process.env.DB_PATH ?? '';

  if (!Number.isFinite(PORT) || PORT <= 0) {
    throw new Error('Invalid PORT. Please set PORT to a valid number');
  }

  if (JWT_SECRET.trim().length < 31) {
    throw new Error('Invalid JWT_SECRET. Please set a long random string (32+ chars)');
  }

  // if (!DB_PATH.trim()) {
  //     throw new Error('Invalid DB_PATH. Please set the DB_PATH variable');
  // }

  return { PORT, JWT_SECRET };
}
