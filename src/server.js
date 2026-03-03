/**
 * server.js
 *
 * Application entry point.
 *
 * Responsibilities:
 * - Validate required environment configuration.
 * - Create repository instances.
 * - Create the Express application via factory.
 * - Start the HTTP server.
 *
 * This file contains startup logic only.
 * No route definitions or middleware configuration should exist here.
 *
 * Architecture:
 * - Repositories are created once at startup.
 * - They are injected into the app and attached to res.locals per request.
 */

import { ensureEnv } from '#utils/env';
import { createApp } from '#app';
import { createRepos } from '#repos/index';

/**
 * @type {{ PORT: number, JWT_SECRET: string }}
 */

const env = ensureEnv(); //validates env variables at startup. fails fast if config is invalid.

const repos = await createRepos();

const app = createApp({
  repos,
  config: { JWT_SECRET: env.JWT_SECRET },
});

// Starts HTTP server and listen on configured port.
app.listen(env.PORT, () => {
  console.log(`IT'S ALIVE!!! This App is listening on http://localhost:${env.PORT}`);
});
