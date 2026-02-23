/**
 * Classes Controller (Phase 1 - In-Memory)
 *
 * HTTP handler functions for the /classes routes.
 *
 * Controllers:
 *  - Read input from the request (params, query, body)
 *  - Use guards (ensure/ensureFields) to fail fast on invalid input
 *  - Call the repository to perform data operations
 *  - Send final HTTP responses (status + JSON) using res.ok/res.created/res.noContent
 *
 * Controllers do NOT:
 *  - Store data directly (repo owns storage)
 *  - Know how data will be persisted long-term (Phase 2 later)
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

import { notFound, forbidden, badRequest } from "#utils/httpErrors";
import { ensure, ensureFields } from "#utils/ensureFieldsGuard";
import { parsePagination } from '#utils/pagination';
// import { parseCsvSet } from "#utils/queryParams"; //may need this later

/**
 * GET /classes (PUBLIC)
 *
 * Returns a paginated list of all classes.
 *
 * Query params (optional):
 *  - limit: number of items per page
 *  - page: 1-based page number
 *
 * Response:
 *  - 200 + list in data
 *  - pagination metadata: { limit, page, total }
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
// Roadmap: support ?include=entries to attach entries per class.
export function listAllClasses(req, res) {
    const { classes } = res.locals.repos;
    const { limit, page, offset } = parsePagination(req.query);

    const result = classes.listAll({
        limit,
        offset,
    });
    return res.ok(result.classList, {
        pagination: { limit, page, total: result.total },
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
 * Roadmap:
 *  - Optional include flags (ex: ?include=entries,author) for expanded responses later.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export function getClassById(req, res) {
    const { classes } = res.locals.repos;

    const id = req.params.id;

    const found = classes.getById(id);
// Roadmap: include=author,entries later
    // const includeAuthor = include.has('author');
    // const includeEntries = include.has('entries');

    // const classFound = classes.getByWithIncludes(id, {
    //     includeAuthor,
    //     includeEntries,
    // });

    ensure(found, notFound('Class not found'));

    return res.ok(found);
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

export function createClass(req, res) {
    const { classes } = res.locals.repos;

    const { className } = req.body ?? {};

    ensure(className, badRequest('Class Name is required'));

    const newClass = classes.create({ className, authorId: req.user.id });

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
export function updateClass(req, res) {
    const { classes } = res.locals.repos;

    const id = req.params.id;

    const updates = {};

    //could put patch behavior here in the future to edit the field(s) that need updating, and return the rest as it was previously. Example below.
    if (req.body.className !== undefined) updates.className = req.body.className;

    ensure(Object.keys(updates).length > 0,
        badRequest('No updatable fields provided'));
    //don't need spread operator at this point, but could be needed for future versions
    const updatedClass = classes.update({ id, className: updates.className, authorId: req.user.id });

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
export function deleteClass(req, res) {
    const { classes } = res.locals.repos;

    const id = req.params.id;

    const result = classes.delete({ id, authorId: req.user.id });

    if (result === 'forbidden') throw forbidden('You cannot delete this class');
    ensure(result, notFound('Class not found'));

    return res.noContent();
}
