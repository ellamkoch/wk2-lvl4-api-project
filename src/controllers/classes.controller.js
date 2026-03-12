/**
 * Classes Controller (Phase 2 - Prisma Backed)
 *
 * HTTP handler functions for the /classes routes.
 *
 * Controllers:
 *  - Read input from the request (params, query, body)
 *  - Use guards (ensure/ensureFields) to fail fast on invalid input
 *  - Call the repository to perform data operations (Prisma-backed)
 *  - Send final HTTP responses (status + JSON) using res.ok/res.created/res.noContent
 *
 * Controllers do NOT:
 *  - Store data directly (repo owns storage)
 *
 * Auth note:
 *  - Public routes: listAllClasses, getClassById
 *  - Protected routes: createClass, updateClass, deleteClass
 *  - requireAuth parses the Bearer token, verifies JWT, and attaches req.user = { id }
 *    (id comes from JWT `sub`)
 *
 * Validation / errors:
 *  - ensure(value, error) throws when value is falsy (or fails a condition)
 *  - Typical errors used here: badRequest (400), notFound (404), forbidden (403)
 *
 * Pagination note:
 *  - Query params arrive as strings.
 *  - parsePagination normalizes and returns { limit, page, offset }.
 *  - listAllClasses includes { pagination: { limit, page, total } } in the response metadata.
 */

import { notFound, forbidden, badRequest } from '#utils/httpErrors';
import { ensure, ensureFields } from '#utils/ensureFieldsGuard';
import { parsePagination } from '#utils/pagination';

/**
 * GET /classes (PUBLIC)
 *
 * Returns a paginated list of all classes.
 *
 * Query params (optional):
 *  - limit: number of items per page
 *  - page: 1-based page number
 *  - can search by class names that match now
 *
 * Response:
 *  - 200 + list in data
 *  - pagination metadata: { limit, page, total }
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export async function listAllClasses(req, res) {
  const { classes } = res.locals.repos;
  const { limit, page, offset } = parsePagination(req.query);
  const { className, authorId } = req.query;
  // console.log("QUERY PARAM:", className);

  const { classList, total } = await classes.listAll({
    limit,
    offset,
    className,
    authorId
  });

  // console.log("CLASSES FROM REPO:", result.classList);

  return res.ok(classList, {
    pagination: { limit, page, total },
  });
}


/**
 * GET /classes/:id (PUBLIC)
 *
 * Returns a single class by id.
 *
 * Errors:
 *  - 404 if the class does not exist
 *
 * Includes Entries if they are present now
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export async function getClassById(req, res) {
  const { classes } = res.locals.repos;

  const id = req.params.id;

  const found = await classes.getByIdWithEntries(id);
  ensure(found, notFound('Class not found'));

  return res.ok(found);
}

/**
 * GET /mine (PROTECTED)
 *
 * Returns a list of classes made by a user id
 *
 * Errors:
- 401 if authentication is missing or invalid*
 *
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export async function getMyClasses(req, res) {
  const { classes } = res.locals.repos;
  const { limit, page, offset } = parsePagination(req.query);

  const userId = req.user.id;

  const result = await classes.listByAuthorId(
    userId, {
    limit,
    offset },
  );
const { classList, total } = result;
// if (total === 0) return res.ok('No classes to list');// if i wanted to put in a helpful msg. this would be handled by the front end normally tho.

  return res.ok(classList, {
    pagination: { limit, page, total },
  });
}

/**
 * POST /classes (PROTECTED)
 *
 * Creates a new class owned by the authenticated user.
 *
 * Body:
 *  - className (required)
 *
 * Errors:
 *  - 400 if required fields are missing/invalid
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export async function createClass(req, res) {
  const { classes } = res.locals.repos;

  const { className } = req.body ?? {};//prevents a crash if its undefined

  ensure(className, badRequest('Class Name is required'));
  ensureFields(req.body, ['className']);

  const newClass = await classes.create({ className, authorId: req.user.id });

  return res.created(newClass);
}

/**
 * PUT /classes/:id (PROTECTED + OWNER)
 *
 * Updates an existing class if owned by the authenticated user.
 *
 * Body:
 *  - className (optional; if omitted, request is rejected)
 *
 * Repo returns:
 *  - updated object (success)
 *  - null (not found)
 *  - 'forbidden' (wrong owner)
 *
 * Errors:
 *  - 400 if no updatable fields were provided
 *  - 404 if class not found
 *  - 403 if class exists but user is not the owner
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function updateClass(req, res) {
  const { classes } = res.locals.repos;

  const id = req.params.id;

  const updates = {};
  if (req.body.className !== undefined) updates.className = req.body.className;

  ensure(Object.keys(updates).length > 0, badRequest('No updatable fields provided'));
  //don't need spread operator at this point, but would be needed for future versions with more fields to be updated
  const updatedClass = await classes.update({
    id,
    className: updates.className,
    authorId: req.user.id,
  });

  if (updatedClass === 'forbidden') throw forbidden('You cannot update this class');
  ensure(updatedClass, notFound('Class not found'));

  return res.ok(updatedClass);
}

/**
 * DELETE /classes/:id (PROTECTED + OWNER)
 *
 * Deletes an existing class if owned by the authenticated user.
 *
 * Repo returns:
 *  - true (deleted)
 *  - null (not found)
 *  - 'forbidden' (wrong owner)
 *
 * Controller returns:
 *  - 204 No Content on success
 *
 * Errors:
 *  - 404 if class not found
 *  - 403 if class exists but user is not the owner
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function deleteClass(req, res) {
  const { classes } = res.locals.repos;

  const id = req.params.id;

  const result = await classes.delete({ id, authorId: req.user.id });

  if (result === 'forbidden') throw forbidden('You cannot delete this class');
  ensure(result, notFound('Class not found'));

  return res.noContent();
}
