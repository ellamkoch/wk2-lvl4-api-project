/**
 * prisma.entry Repository (Phase 2 - Prisma Backed)
 *
 * This repository handles data operations for prisma.entry using the
 * Prisma client. It no longer relies on in-memory storage – all actions
 * are persisted to the database.
 *
 * Responsibilities:
 *  - Perform CRUD operations via Prisma
 *  - Enforce ownership checks
 *  - Support nested listing by class
 *  - Apply optional windowing (limit/offset)
 *
 * This repo does NOT:
 *  - Parse HTTP query parameters
 *  - Send HTTP responses
 *  - Know about Express
 *
 * Return contracts:
 *  - success → object / array / { entryList, total }
 *  - not found → null
 *  - wrong owner → 'forbidden'
 */

export function createEntriesRepo(prisma) {
  return {
    /**
     * Public: list all entries for a specific class.
     *
     * @param {string} classId  Class UUID to filter by.
     * @param {Object} params
     * @param {number} [params.limit]      Optional maximum number of items.
     * @param {number} [params.offset]     Optional number of items to skip.
     * @returns {{ entryList: any[], total: number }}
     */
    async listByClassId(classId, { limit, offset } = {}) {
      const query = {
        where: { classId },
        orderBy: { id: 'asc' },
      };

      if (limit !== undefined) query.take = limit;
      if (offset !== undefined) query.skip = offset;

      const [entryList, total] = await Promise.all([
        prisma.entry.findMany(query),
        prisma.entry.count({ where: { classId } }),
      ]);
      return { entryList, total };
    },

    /**
     * Public: get a single entry by id (no ownership restriction).
     *
     * @param {string} id  Entry UUID.
     * @returns {Object|null}
     */
    async getById(id) {
      return await prisma.entry.findUnique({ where: { id } });
    },
    /**
     * Create a new entry under a class.
     *
     * @param {Object} params
     * @param {string} params.classId    Class UUID.
     * @param {string} params.horseName  Horse name.
     * @param {string} params.authorId   Author's UUID.
     * @returns {{ id: string, classId: string, horseName: string, authorId: string }}
     */

    async create({ classId, horseName, exhibitor, authorId }) {
      return prisma.entry.create({
        data: { classId, horseName, exhibitor, authorId },
      });
    },

    /**
     * Update an entry if owned by the given author.
     *
     * @param {Object} params
     * @param {string} params.id         Entry UUID.
     * @param {string} params.horseName  New horse name.
     * @param {string} params.authorId   Author's UUID for permission check.
     * @returns {Object | null | 'forbidden'}
     */
    async update({ id, horseName, exhibitor, authorId }) {
      const updatedEntry = await prisma.entry.findUnique({ where: { id } });
      if (!updatedEntry) return null;
      if (updatedEntry.authorId !== authorId) return 'forbidden';

      return prisma.entry.update({
        where: { id },
        data: {
          horseName,
          exhibitor
         },
         select: {
          id: true,
          classId: true,
          horseName: true,
          exhibitor: true,
          authorId: true,
          createdAt: true,
         }
      });
    },

    /**
     * Delete an entry if owned by the given author.
     *
     * @param {Object} params
     * @param {string} params.id         Entry UUID.
     * @param {string} params.authorId   Author's UUID for permission check.
     * @returns {true | null | 'forbidden'}
     */
    // Roadmap (Phase 2+):
    // Consider soft-delete via status field (e.g., status: 'active' | 'scratched')
    // to support billing scenarios where scratched entries are still billable.
    async delete({ id, authorId }) {
      const deletedEntry = await prisma.entry.findUnique({ where: { id } });
      if (!deletedEntry) return null;
      if (deletedEntry.authorId !== authorId) return 'forbidden';

      await prisma.entry.delete({ where: { id } });
      return true;
    },

    /**
     * Find an entry by id and verify ownership.
     *
     * @param {Object} params
     * @param {string} params.id         Entry UUID.
     * @param {string} params.authorId   Author's UUID for permission check.
     * @returns {Object | null | 'forbidden'}
     */
    // Roadmap:
    // If using nested routes for update/delete, consider verifying entry.classId matches route param.
    async findByIdForAuthor({ id, authorId }) {
      const found = await prisma.entry.findUnique({ where: { id } });

      if (!found) return null;
      if (found.authorId !== authorId) return 'forbidden';

      return found;
    },
  };
}
