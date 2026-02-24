/**
 * Classes Repository (Phase 1 - In-Memory)
 *
 * This repository handles data operations for classes.
 *
 * Responsibilities:
 *  - Store class records in memory
 *  - Enforce ownership checks
 *  - Apply optional windowing (limit/offset)
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
import { applyWindow } from '#utils/applyWindow';
import crypto from 'crypto';

export function createClassesRepo() {
  const classes = [];

  return {
    /**
     * Public: list all classes (no ownership restrictions).
     *
     * @param {Object} params
     * @param {number} [params.limit]
     * @param {number} [params.offset]
     * @returns {{ classList: any[], total: number }}
     */
    listAll({ limit, offset } = {}) {
      const all = classes;
      const classList = applyWindow(all, { limit, offset });

      return { classList, total: all.length };
    },

    /**
     * Public: get a single class by id (no ownership restriction).
     *
     * @param {number|string} id
     * @returns {Object|null}
     */
    getById(id) {
      return classes.find((c) => c.id === id) ?? null;
    },
    /**
     * Create a new class owned by a user.
     *
     * @param {Object} params
     * @param {string} params.className
     * @param {number|string} params.authorId
     * @returns {{ id: number, className: string, authorId: any }}
     */
    create({ className, authorId }) {
      const newClass = { id: crypto.randomUUID(), className, authorId };
      classes.push(newClass);
      return newClass;
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
    update({ id, className, authorId }) {
      const updatedClass = classes.find((c) => c.id === id) ?? null;
      if (!updatedClass) return null;
      if (updatedClass.authorId !== authorId) return 'forbidden';

      updatedClass.className = className;
      return updatedClass;
    },

    /**
     * Delete a class if owned by the given author.
     *
     * @param {Object} params
     * @param {number|string} params.id
     * @param {number|string} params.authorId
     * @returns {true | null | 'forbidden'}
     */
    delete({ id, authorId }) {
      const idx = classes.findIndex((c) => c.id === id);
      if (idx === -1) return null;

      if (classes[idx].authorId !== authorId) return 'forbidden';

      classes.splice(idx, 1);
      return true;
    },

    /**
     * List classes by author without total metadata.
     *
     * @param {number|string} authorId
     * @param {{ limit?: number, offset?: number }} options
     * @returns {any[]}
     */
    listByAuthorId(authorId, options = {}) {
      const classList = classes.filter((c) => c.authorId === authorId);
      return applyWindow(classList, options);
    },

    /**
     * Find a class by id and verify ownership.
     *
     * @param {Object} params
     * @param {number|string} params.id
     * @param {number|string} params.authorId
     * @returns {Object | null | 'forbidden'}
     */
    findByIdForAuthor({ id, authorId }) {
      const found = classes.find((c) => c.id === id);

      if (!found) return null;
      if (found.authorId !== authorId) return 'forbidden';

      return found;
    },
  };
}
