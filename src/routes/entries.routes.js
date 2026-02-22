/**
 * Entries Routes (Phase 1 - In-Memory)
 *
 * This router handles flat routes for individual entries.
 *
 * Route Design:
 *  - Nested routes for listing/creating entries under a class
 *    are mounted in classes.routes.js:
 *      - GET /classes/:classId/entries
 *      - POST /classes/:classId/entries
 *
 *  - Flat routes for directly editing or deleting a specific entry
 *    are handled here:
 *      - PUT /entries/:entryId
 *      - DELETE /entries/:entryId
 *
 * Auth:
 *  - All routes in this file require authentication.
 *  - requireAuth attaches req.user.id (JWT sub).
 *
 * JSON:
 *  - PUT requires JSON body validation via requireJson.
 *  - DELETE does not require a body.
 *
 * These routes delegate all business logic to the entries controller.
 */

/**
 * Roadmap (Phase 2+):
 *
 * Consider supporting nested update/delete routes:
 *   - PUT /classes/:classId/entries/:entryId
 *   - DELETE /classes/:classId/entries/:entryId
 *
 * This would allow:
 *   - Verifying the entry belongs to the provided classId.
 *   - Making deletion semantics clearer in show-world logic
 *     (removing a horse from a specific class).
 *
 * Current Phase 1 design uses flat routes:
 *   - PUT /entries/:entryId
 *   - DELETE /entries/:entryId
 *
 * The entry record already stores classId, so nested validation
 * is not required for Phase 1 rubric compliance.
 */
import { Router } from "express";
import {
    updateEntry,
    deleteEntry
 } from "#controllers/entries.controller";
import { requireAuth } from "#middleware/requireAuth";
import { requireJson } from "#middleware/requireJson";

export const entriesRouter = Router();

//Require Auth routes

//Roadmap - update could be a patch later when there are more fields. PUT is fine for now.
entriesRouter.put('/:entryId', requireAuth, requireJson, updateEntry);
entriesRouter.delete('/:entryId', requireAuth, deleteEntry);


