/**
 * prisma.user Repository (Prisma Backed)
 *
 * This repository provides a thin wrapper around the Prisma client for
 * working with user records. All operations are persisted to the database.
 *
 * Responsibilities:
 *  - Create users
 *  - Lookup users by email or id
 *
 * This repo does NOT:
 *  - Handle authentication logic
 *  - Hash passwords (done prior to calling `create`)
 *  - Interact with HTTP/Express
 *
 * Return contracts follow Prisma's output directly.
 */

export function createUsersRepo(prisma) {
  return {
    /**
     * Insert a new user record.
     *
     * @param {{ email: string, passwordHash: string }} data
     * @returns {{ id: string, email: string, passwordHash: string }}
     */
    async create(data) {
      return prisma.user.create({ data });
    },

    /**
     * Lookup a user by their unique email address.
     *
     * @param {string} email
     * @returns {Object|null}  User object or null if not found.
     */
    async findByEmail(email) {
      return prisma.user.findUnique({ where: { email } });
    },

    /**
     * Lookup a user by their primary key.
     *
     * @param {string} id
     * @returns {Object|null}  User object or null if not found.
     */
    async findById(id) {
      return prisma.user.findUnique({ where: { id } });
    },
  };
}
