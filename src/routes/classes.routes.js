/**
 * Classes Routes
 *
 * Defines all HTTP routes for /classes.
 *
 * Route Categories:
 *  - Public:
 *      GET /classes
 *      GET /classes/:id
 *
 *  - Protected (requireAuth):
 *      POST /classes
 *      PUT /classes/:id
 *      DELETE /classes/:id
 *
 * Middleware Responsibilities:
 *  - requireAuth: verifies JWT and attaches req.user
 *  - requireJson: ensures request body is valid JSON
 *
 * Controllers handle:
 *  - Reading params/query/body
 *  - Calling repository methods
 *  - Returning HTTP responses
 */
import { Router } from "express"

import {
    listAllClasses,
    getClassById,
    createClass,
    updateClass,
    deleteClass,
    } from '#controllers/classes.controller';
    //import listentriesforclass and createentry for class and updateentry here later
    import { requireAuth } from "#middleware/requireAuth";
    import { requireJson } from "#middleware/requireJson";

 /**
 * Express router for /classes routes.
 * Mounted in the main app via app.use('/classes', classesRouter)
 */
export const classesRouter = Router();

//public routes
classesRouter.get('/', listAllClasses);
classesRouter.get('/:id', getClassById);

//Protected Routes that require Auth
classesRouter.post('/', requireAuth, requireJson, createClass);
classesRouter.put('/:id', requireAuth, requireJson, updateClass);
classesRouter.delete('/:id', requireAuth, deleteClass);
