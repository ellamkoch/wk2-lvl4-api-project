/**
 * createApp.js
 *
 * Express application factory.
 *
 * Responsibilities:
 * - Create and configure the Express app instance.
 * - Register global middleware (JSON parser, security, logging).
 * - Register base health route.
 * - Attach application configuration via app.locals.
 *
 * This function does NOT start the server.
 * That responsibility belongs to server.js.
 */
/**
 * Creates and configures the Express application.
 *
 * @param {Object} options
 * @param {Object} options.repos - Repository container injected per request via res.locals.repos
 * @param {Object} [options.config] - Application configuration values (ex: JWT_SECRET)
 * @returns {import('express').Express}
 */


import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { respond } from '#middleware/responds';
import { requestId } from '#middleware/requestId';
import { errorHandler } from '#middleware/errorHandler';
import { notFoundHandler } from '#middleware/notFoundHandler';

import { classesRouter } from '#routes/classes.routes';
import { authRouter } from '#routes/auth.routes';

export function createApp({ repos, config = {} }) {
    const app = express();

    app.locals.config = config;

    app.use(express.json());

    app.use(helmet());

    app.use(morgan('dev'));

    app.use((req, _res, next) => {//not needed perhaps?
        next();
    })

    app.use(requestId);

    app.use(respond);

    app.get('/health', (req, res) => {
        return res.ok({ status: 'ok' });
    });

    app.use((_req, res, next) => {
        res.locals.repos = repos;
        next();
    });

    //routes
    app.use('/classes', classesRouter);
    app.use('/auth', authRouter);

    app.use(notFoundHandler);

    app.use(errorHandler);

    return app;
}
