/**
 * Entries Repository (Phase 1 - In-Memory)
 *
 * This repository handles data operations for entries.
 *
 * Responsibilities:
 *  - Store entry records in memory
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
 *  - success → object / array / { entriesList, total }
 *  - not found → null
 *  - wrong owner → 'forbidden'
 */

import { applyWindow } from '#utils/applyWindow';
import crypto from 'crypto';

export function createEntriesRepo() {
  const entries = [];

  return {
    /**
     * Public: list all entries for a specific class.
     *
     * @param {number|string} classId
     * @param {Object} params
     * @param {number} [params.limit]
     * @param {number} [params.offset]
     * @returns {{ entriesList: any[], total: number }}
     */

    listByClassId(classId, { limit, offset } = {}) {
      const all = entries.filter((e) => e.classId === classId);
      const total = all.length;

      const entriesList = applyWindow(all, { limit, offset });

      return { entriesList, total };
    },

    getById(id) {
      return entries.find((e) => e.id === id) ?? null;
    },
    /**
     * Create a new entry under a class.
     *
     * @param {Object} params
     * @param {number|string} params.classId
     * @param {string} params.horseName
     * @param {number|string} params.authorId
     * @returns {{ id: number, classId: any, horseName: string, authorId: any }}
     */

    create({ classId, horseName, authorId }) {
      const newEntry = { id: crypto.randomUUID(), classId, horseName, authorId };
      entries.push(newEntry);
      return newEntry;
    },

    /**
     * Update an entry if owned by the given author.
     *
     * @param {Object} params
     * @param {number|string} params.id
     * @param {string} params.horseName
     * @param {number|string} params.authorId
     * @returns {Object | null | 'forbidden'}
     */
    update({ id, horseName, authorId }) {
      const updatedEntry = entries.find((e) => e.id === id) ?? null;
      if (!updatedEntry) return null;
      if (updatedEntry.authorId !== authorId) return 'forbidden';

      updatedEntry.horseName = horseName;
      return updatedEntry;
    },

    /**
     * Delete an entry if owned by the given author.
     *
     * @param {Object} params
     * @param {number|string} params.id
     * @param {number|string} params.authorId
     * @returns {true | null | 'forbidden'}
     */

    // Roadmap (Phase 2+):
    // Consider soft-delete via status field (e.g., status: 'active' | 'scratched')
    // to support billing scenarios where scratched entries are still billable.
    delete({ id, authorId }) {
      const idx = entries.findIndex((e) => e.id === id);
      if (idx === -1) return null;

      if (entries[idx].authorId !== authorId) return 'forbidden';

      entries.splice(idx, 1);
      return true;
    },

    // listByAuthorId( authorId, options = {} ){
    //     const classEntries = entries.filter((e) => e.authorId === authorId);
    //     return applyWindow(classEntries, options);
    // },

    /**
     * Find an entry by id and verify ownership.
     *
     * @param {Object} params
     * @param {number|string} params.id
     * @param {number|string} params.authorId
     * @returns {Object | null | 'forbidden'}
     */

    // Roadmap:
    // If using nested routes for update/delete,
    // consider verifying entry.classId matches route param.
    findByIdForAuthor({ id, authorId }) {
      const found = entries.find((e) => e.id === id);

      if (!found) return null;
      if (found.authorId !== authorId) return 'forbidden';

      return found;
    },
  };
}
