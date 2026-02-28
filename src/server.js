/**
 * server.js (Phase 2 - Prisma Backed)
 *
 * Application entry point.
 *
 * Responsibilities:
 * - Validate required environment configuration.
 * - Initialize Prisma client and repositories.
 * - Create the Express application via factory.
 * - Start the HTTP server.
 * - Gracefully shut down Prisma connections on process termination.
 *
 * This file contains startup logic only.
 * No route definitions or middleware configuration should exist here.
 *
 * Architecture:
 * - Prisma client is initialized and passed to repository factory.
 * - All repositories use Prisma for database operations (no in-memory storage).
 * - Repositories are created once at startup and injected into app.
 * - Repositories are attached to req.locals per request for controller access.
 */

import { ensureEnv } from '#utils/env';
import { createApp } from '#app';
import { createRepos } from '#repos/index';
import { prisma } from './db/prisma.js';

/**
 * Validated environment variables required for startup.
 *
 * @type {{ PORT: number, JWT_SECRET: string }}
 */

const env = ensureEnv(); //validates env variables at startup. fails fast if config is invalid.

/**
 * Initialize all Prisma-backed repositories.
 *
 * @type {Promise<{ classes, users, entries }>}
 */
const repos = await createRepos(prisma);

const app = createApp({
  repos,
  config: { JWT_SECRET: env.JWT_SECRET },
});

// Start HTTP server and listen on configured port.
app.listen(env.PORT, () => {
  console.log(`IT'S ALIVE!!! This App is listening on http://localhost:${env.PORT}`);
});

/**
 * Graceful shutdown handler.
 * Closes all Prisma database connections and exits the process.
 */
async function shutdown() {
  await prisma.$disconnect();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
