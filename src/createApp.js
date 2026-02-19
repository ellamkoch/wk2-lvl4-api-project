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
 * @param {Object} options.config - Application configuration values.
 * @returns {import('express').Express}
 */


import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { respond } from '#middleware/responds';
import { requestId } from '#middleware/requestId';
// import { requireJson } from '#middleware/requireJson';//bring this back when you put in the routes/paths
import { errorHandler } from '#middleware/errorHandler';
import { notFoundHandler } from '#middleware/notFoundHandler';

export function createApp({ config = {} }) {
    const app = express();

    app.locals.config = config;

    app.use(express.json());


    app.use(helmet());

    app.use(morgan('dev'));

    // app.use((req, _res, next) => {//not needed perhaps? 
    //     next();
    // })

    app.use(requestId);

    app.use(respond);

    app.get('/health', (req, res) => {
        return res.ok({ status: 'ok' });

    });

    app.use(notFoundHandler);

    app.use(errorHandler);

    return app;
}
