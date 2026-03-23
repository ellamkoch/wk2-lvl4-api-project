/**
 * prisma.class Repository (Phase 2 - Prisma Backed)
 *
 * This repository handles data operations for prisma.class using the
 * Prisma client. It no longer relies on in-memory storage – all actions
 * are persisted to the database.
 *
 * Responsibilities:
 *  - Perform CRUD operations via Prisma
 *  - Enforce ownership checks
 *  - Apply optional windowing (limit/offset)
 *  - listAll now also includes related entries by default
 *
 * This repo does NOT:
 *  - Parse HTTP query parameters
 *  - Send HTTP responses
 *  - Know about Express
 *
 * Return contracts:
 *  - success → object / array / { classList, total }
 *  - not found → null
 *  - wrong owner → 'forbidden'
 */

export function createClassesRepo(prisma) {
  return {
    /**
     * Public: list all prisma.class records (no ownership restrictions).
     * Related `entries` are included on every returned class by default.
     *
     * @param {Object} params
     * @param {number} [params.limit]      Optional maximum number of items.
     * @param {number} [params.offset]     Optional number of items to skip.
     * @returns {{ classList: any[], total: number }}  `classList` items each
     *   include an `entries` array (related records are fetched by default).
     */

    async listAll({ limit, offset } = {}) {
      const query = { orderBy: { id: 'asc' }, omit: {
        authorId: true,
      }
      };

      if (limit !== undefined) query.take = limit;
      if (offset !== undefined) query.skip = offset;

      const [classList, total] = await Promise.all([
        prisma.class.findMany(query),
        prisma.class.count(),
      ]);
      return { classList, total };
    },

    /**
     * Public: get a single class by id (no ownership restriction).
     *
     * Note: this method currently returns only the class record itself;
     * related entries are NOT included. (Use listAll for entry inclusion.)
     *
     * @param {number|string} id
     * @returns {Object|null}
     */
    async getById(id) {
      return await prisma.class.findUnique({ where: { id } });
    },

    /**
     * Public: return a single class along with its related entries.
     *
     * @param {string} id  Class primary key (UUID).
     * @returns {Object|null}  Includes `entries` array if found.
     */
    async getByIdWithEntries(id) {
      return prisma.class.findUnique({
        where: { id },
        include: { entries: true },
      });
    },

    /**
     * Create a new class owned by a user.
     *
     * @param {Object} params
     * @param {string} params.className
     * @param {number|string} params.authorId
     * @returns {{ id: string, className: string, authorId: string }}
     */
    async create({ className, authorId }) {
      return prisma.class.create({
        data: { className, authorId },
      });
    },

    /**
     * Update a class if owned by the given author.
     *
     * @param {Object} params
     * @param {number|string} params.id
     * @param {string} params.className
     * @param {number|string} params.authorId
     * @returns {Object | null | 'forbidden'}
     */
    async update({ id, className, authorId }) {
      const updatedClass = await prisma.class.findUnique({ where: { id } });
      if (!updatedClass) return null;
      if (updatedClass.authorId !== authorId) return 'forbidden';

      return prisma.class.update({
        where: { id },
        data: { className },
      });
    },

    /**
     * Delete a class if owned by the given author.
     *
     * @param {Object} params
     * @param {number|string} params.id
     * @param {number|string} params.authorId
     * @returns {true | null | 'forbidden'}
     */
    async delete({ id, authorId }) {
      const deletedClass = await prisma.class.findUnique({ where: { id } });
      if (!deletedClass) return null;
      if (deletedClass.authorId !== authorId) return 'forbidden';

      await prisma.class.delete({ where: { id } });
      return true;
    },

    /**
     * List prisma.class records owned by a particular author.
     * Related entries are *not* included (use `getByIdWithEntries` or
     * `listAll` for that behavior).
     *
     * @param {string} authorId  Owner's UUID.
     * @param {{ limit?: number, offset?: number }} options
     * @returns {any[]}  Array of class objects without `entries`.
     */
    async listByAuthorId(authorId, { limit, offset } = {}) {
      return prisma.class.findMany({
        where: { authorId },
        skip: offset,
        take: limit,
        orderBy: { id: 'asc' },
      });
    },

    /**
     * Find a class by id and verify ownership. Returned object does not
     * include associated entries.
     *
     * @param {Object} params
     * @param {string} params.id         Class UUID.
     * @param {string} params.authorId   Author's UUID for permission check.
     * @returns {Object | null | 'forbidden'}
     */
    async findByIdForAuthor({ id, authorId }) {
      const found = await prisma.class.findUnique({ where: { id } });

      if (!found) return null;
      if (found.authorId !== authorId) return 'forbidden';

      return found;
    },
  };
}
