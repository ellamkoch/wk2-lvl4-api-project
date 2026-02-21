/**
 * Classes Controller (Phase 1 - In-Memory)
 *
 * This file contains HTTP-focused handler functions for the /classes routes.
 *
 * Controllers:
 *  - Read input from the request (params, query, body)
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
 *  - requireAuth attaches the authenticated identity as req.user.id (from JWT sub)
 *
 * Pagination note:
 *  - Query params arrive as strings.
 *  - We normalize via parsePagination to produce { limit, page, offset }.
 */
import { notFound, forbidden, badRequest } from "#utils/httpErrors";

import { parsePagination } from '#utils/pagination';
// import { parseCsvSet } from "#utils/queryParams"; //may need this later

/**
 * GET /classes (PUBLIC)
 *
 * Returns a paginated list of all classes.
 *
 * Query params (optional):
 *  - limit, page (handled by parsePagination)
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

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
 * Roadmap:
 *  - Support query param includes (ex: ?include=author,entries) once entries exist.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export function getClassById(req, res) {
    const { classes } = res.locals.repos;

    const id = Number(req.params.id);

    const found = classes.getById(id);
// Roadmap: include=author,entries later
    // const includeAuthor = include.has('author');
    // const includeEntries = include.has('entries');

    // const classFound = classes.getByWithIncludes(id, {
    //     includeAuthor,
    //     includeEntries,
    // });

    if(!found) {
        throw notFound('Class not found');
    }

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
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export function createClass(req, res) {
    const { classes } = res.locals.repos;

    const { className } = req.body ?? {};

    if (!className) {
    throw badRequest('Class Name is required');
  }

    const newClass = classes.create({ className, authorId: req.user.id });

    return res.created(newClass);
}

/**
 * PUT /classes/:id (PROTECTED + OWNER)
 *
 * Updates an existing class if owned by the authenticated user.
 *
 * Repo returns:
 *  - updated object (success)
 *  - null (not found)
 *  - 'forbidden' (wrong owner)
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export function updateClass(req, res) {
    const { classes } = res.locals.repos;

    const id = Number(req.params.id);

    const updates = {};

    //could put patch behavior here in the future to edit the field(s) that need updating, and return the rest as it was previously. Example below.
    if (req.body.className !== undefined) updates.className = req.body.className;

    if (Object.keys(updates).length === 0) {
        throw badRequest({ message: 'Please update the field' });
    }
    //don't need spread operator at this point, but could be needed for future versions
    const updatedClass = classes.update({ id, className: updates.className, authorId: req.user.id });

    if (updatedClass === null) throw notFound('Class not found');
    if (updatedClass === 'forbidden') throw forbidden('You cannot update this class');
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
 * Controller returns 204 No Content on success.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export function deleteClass(req, res) {
    const { classes } = res.locals.repos;

    const id = Number(req.params.id);

    const result = classes.delete({ id, authorId: req.user.id });

    if (result === null) throw notFound('Class not found');

    if (result === 'forbidden') throw forbidden('You cannot delete this class');

    return res.noContent();
}
