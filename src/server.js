/**
 * server.js
 *
 * Application entry point.
 *
 * Responsibilities:
 * - Validate required environment configuration.
 * - Create the Express application instance.
 * - Start the HTTP server.
 *
 * This file should contain startup logic only.
 * No route logic or middleware should be defined here.
 */
/**
 * @type {{ PORT: number, JWT_SECRET: string }}
 */


import { ensureEnv } from '#utils/env';
import { createApp } from '#app';
// import { createRepos } from '#repositories/index';

const env = ensureEnv(); //validates env variables at startup. fails fast if config is invalid.

// const repos = await createRepos();

const app = createApp({
    // repos,
    config: { JWT_SECRET: env.JWT_SECRET },
});

// Starts HTTP server and listen on configured port.
app.listen(env.PORT, () => {
    console.log(`App listening on http://localhost:${env.PORT}`);
});

