/**
 * Users Repository (In-Memory)
 *
 * Stores user records for Phase 1.
 *
 * Data shape:
 * { id, email, passwordHash }
 *
 * Data resets on server restart.
 *
 * Phase: 1
 */
/**
 * Create a new user.
 *
 * @param {{ email: string, passwordHash: string }} input
 * @returns {{ id: string, email: string, passwordHash: string }}
 */
import crypto from 'crypto';

export function createUsersRepo() {
  const users = [];

  return {
    create(data) {
      const user = { id: crypto.randomUUID(), ...data };
      users.push(user);
      return user;
    },

    findByEmail(email) {
      return users.find((u) => u.email === email) ?? null;
    },

    findById(id) {
      return users.find((u) => u.id === id) ?? null;
    },
  };
}
