/**
 * Entries Controller (Phase 2 - Prisma Backed)
 *
 * This file contains HTTP-focused handler functions for the entries routes.
 *
 * Controllers:
 *  - Read input from the request (params, query, body)
 *  - Call the repository to perform data operations (Prisma-backed)
 *  - Send final HTTP responses (status + JSON) using res.ok/res.created/res.noContent
 *
 * Controllers do NOT:
 *  - Store data directly (repo owns storage)
 *
 * Auth note:
 *  - Public routes: listEntriesForClass
 *  - Protected routes: createEntryForClass, updateEntry, deleteEntry
 *  - requireAuth attaches the authenticated identity as req.user.id (from JWT sub)
 *
 * Parent existence rule:
 *  - Nested routes validate class existence via the classes repo.
 *  - Flat update/delete routes also validate that the parent class still exists
 *    by looking up the entry first, then checking classes.getById(entry.classId).
 *
 * Pagination note:
 *  - Query params arrive as strings.
 *  - We normalize via parsePagination to produce { limit, page, offset }.
 */

/**
 * Roadmap (Phase 2+):
 *
 * Add GET /entries
 *
 * Potential behaviors:
 *  - List all entries across all classes (admin view)
 *  - List entries for the authenticated user only
 *  - Support pagination and filters (ex: ?classId=3)
 *
 * Not required for Phase 1 rubric.
 */

import { notFound, forbidden, badRequest } from '#utils/httpErrors';
import { ensureFields, ensure } from '#utils/ensureFieldsGuard';
import { parsePagination } from '#utils/pagination';

/**
 * GET /classes/:classId/entries (PUBLIC)
 *
 * Returns a paginated list of all entries for a specific class.
 *
 * Query params (optional):
 *  - limit, page (handled by parsePagination)
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export async function listEntriesForClass(req, res) {
  const { classes, entries } = res.locals.repos;
  const classId = req.params.classId;

  const foundClass = await classes.getById(classId);
  ensure(foundClass, notFound('Class not found'));

  const { limit, page, offset } = parsePagination(req.query);

  const result = await entries.listByClassId(classId, { limit, offset });

  return res.ok(result.entryList, {
    pagination: { limit, page, total: result.total },
  });
}

/**
 * POST /classes/:classId/entries (PROTECTED)
 *
 * Creates a new entry under a class owned by the authenticated user.
 *
 * Body:
 *  - horseName (required)
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export async function createEntry(req, res) {
  const { classes, entries } = res.locals.repos;
  const classId = req.params.classId;

  const foundClass = await classes.getById(classId);
  ensure(foundClass, notFound('Class not found'));
  ensureFields(req.body, ['horseName']);
  const { horseName, exhibitor } = req.body;
  ensure(horseName.length >= 1 && horseName.length <= 28, badRequest('Horse name must be 28 characters or less'));

  const newEntry = await entries.create({
    classId,
    horseName,
    exhibitor,
    authorId: req.user.id,
  });

  return res.created(newEntry);
}

/**
 * PUT /entries/:entryId (PROTECTED + OWNER)
 *
 * Updates an existing entry if owned by the authenticated user.
 *
 * Repo returns:
 *  - updated object (success)
 *  - null (not found) - guarded earlier via getById
 *  - 'forbidden' (wrong owner)
 *
 * Body:
 *  - horseName (optional, but at least one field must be provided)
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function updateEntry(req, res) {
  const { entries, classes } = res.locals.repos;
  const id = req.params.entryId;

  const { horseName, exhibitor } = req.body;

  ensure(
    horseName !== undefined || exhibitor !== undefined, badRequest('At least 1 field must be updated')
  )
  if (horseName !== undefined) {
    ensure(horseName.length >= 1 && horseName.length <= 28, badRequest('Horse name must be 28 characters or less')
  );
  }

  const updates = {
    ...(horseName !== undefined && { horseName }),
    ...(exhibitor !== undefined && { exhibitor })
  };

  const entry = await entries.getById(id);
  ensure(entry, notFound('Entry not found'));
  ensure(await classes.getById(entry.classId), notFound('Class not found'));

  const updatedEntry = await entries.update({
    id,
    ...updates,
    authorId: req.user.id,
  });

  if (updatedEntry === 'forbidden') throw forbidden('You cannot update this entry');

  return res.ok(updatedEntry);
}

/**
 * DELETE /entries/:entryId (PROTECTED + OWNER)
 *
 * Deletes an existing entry if owned by the authenticated user.
 *
 * Repo returns:
 *  - true (deleted)
 *  - null (not found) - guarded earlier via getById
 *  - 'forbidden' (wrong owner)
 *
 * Controller returns 204 No Content on success.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function deleteEntry(req, res) {
  const { entries, classes } = res.locals.repos;
  const id = req.params.entryId;

  const entry = await entries.getById(id);
  ensure(entry, notFound('Entry not found'));

  const parentClass = await classes.getById(entry.classId);
  ensure(parentClass, notFound('Class not found'));

  const result = await entries.delete({ id, authorId: req.user.id });

  if (result === 'forbidden') throw forbidden('You cannot delete this entry');

  return res.noContent();
}
