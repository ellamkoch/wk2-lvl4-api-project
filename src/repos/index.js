/**
 * Repository Factory (Prisma Backed – Phase 2)
 *
 * Initializes and exports all data access repositories. Each repository is
 * a thin wrapper around Prisma client methods, providing consistent interfaces
 * for CRUD operations and ownership checks across the application.
 *
 * All repositories now use the Prisma client and persist data to the database.
 * In-memory storage is no longer used.
 */

/**
 * Create all application repositories.
 *
 * @param {PrismaClient} prisma  The initialized Prisma client instance.
 * @returns {Promise<{
 *   classes: Object,  Repository for Class operations.
 *   users: Object,    Repository for User operations.
 *   entries: Object   Repository for Entry operations.
 * }>}
 */
export async function createRepos(prisma) {
  const { createUsersRepo } = await import('./users.repo.js');
  const { createClassesRepo } = await import('./classes.repo.js');
  const { createEntriesRepo } = await import('./entries.repo.js');

  return {
    classes: createClassesRepo(prisma),
    users: createUsersRepo(prisma),
    entries: createEntriesRepo(prisma),
  };
}
