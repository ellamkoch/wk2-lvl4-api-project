<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Phase 1 – In-Memory Resource API](#phase-1--in-memory-resource-api)
  - [Design Philosophy](#design-philosophy)
  - [Phase 1 Goals](#phase-1-goals)
  - [ID Strategy (Phase 1 Requirement)](#id-strategy-phase-1-requirement)
  - [Authentication (Phase 1)](#authentication-phase-1)
  - [Entries Resource (Phase 1)](#entries-resource-phase-1)
  - [Cascade Behavior](#cascade-behavior)
  - [Guard Pattern Consistency Pass (Pre-Testing Refactor)](#guard-pattern-consistency-pass-pre-testing-refactor)
  - [Test Coverage (Phase 1)](#test-coverage-phase-1)
  - [Tech Stack (Phase 1)](#tech-stack-phase-1)
  - [Project Structure](#project-structure)
- [How to Run/Install](#how-to-runinstall)
  - [Environment Setup](#environment-setup)
  - [Required Variables (Phase 1 Minimum)](#required-variables-phase-1-minimum)
  - [Additional Variables (Phase 2 – Database Mode)](#additional-variables-phase-2--database-mode)
  - [Running the Server](#running-the-server)
- [Scripts](#scripts)
  - [Database Scripts (Phase 2)](#database-scripts-phase-2)
- [Author Notes](#author-notes)
  - [Architecture](#architecture)
  - [Response & Error Envelope](#response--error-envelope)
  - [Health Check Endpoint](#health-check-endpoint)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Request Correlation](#request-correlation)
- [Phase 2 – Prisma + Supabase Integration](#phase-2--prisma--supabase-integration)
  - [Phase 2 Goals](#phase-2-goals)
  - [Tech Stack (Updated for Phase 2)](#tech-stack-updated-for-phase-2)
  - [Project Structure (Phase 2 Additions)](#project-structure-phase-2-additions)
  - [Prisma Initialization](#prisma-initialization)
  - [Database Schema](#database-schema)
  - [Migrations](#migrations)
  - [Seeding & Safe Reset](#seeding--safe-reset)
  - [Repository Migration (Engine Swap)](#repository-migration-engine-swap)
  - [Repository Completion (Users + Entries)](#repository-completion-users--entries)
  - [Controller Async Alignment (Phase 2 Adjustment)](#controller-async-alignment-phase-2-adjustment)
  - [Testing Strategy](#testing-strategy)
  - [Continuous Integration (Phase 2)](#continuous-integration-phase-2)
  - [RLS Notes (Phase 2)](#rls-notes-phase-2)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# wk2-lvl4-api-project

This is a repo Phases 1 and 2 for my Level 4, Week 2 API project with CodeX.

This project is part of a two-phase assignment:

- **Phase 1:** In-memory API (no database)
- **Phase 2:** Supabase Postgres + Prisma ORM v7 integration

Phase 1 focuses on:

- Clean application structure
- Environment validation
- Security best practices
- Consistent API response envelope
- Authentication (JWT)
- Ownership enforcement
- Test coverage

The goal is to build a stable, production-ready API foundation before introducing persistence.

## Phase 1 – In-Memory Resource API

A structured Express API built for CodeX Level 4 Week 2.

This phase focuses exclusively on building a clean, production-structured API using **in-memory storage** (no database).

Future phases will replace in-memory storage with Supabase Postgres + Prisma ORM without changing the API contract.

### Design Philosophy

- Fail fast on invalid configuration
- Keep startup logic separate from app construction
- Maintain consistent response shape
- Enforce ownership at the application layer
- Prepare for database integration without refactoring the API contract

### Phase 1 Goals

- [x] Bootable Express server
- [x] Environment validation
- [x] Security middleware
- [x] Logging middleware
- [x] Global response helper
- [x] Global error handler
- [x] JWT auth routes
- [x] Primary resource (classes)
- [x] Related resource (entries)
- [x] Nested routes (one-to-many)
- [x] Cascade delete (class → entries)
- [x] Ownership enforcement
- [x] Guard pattern consistency pass (ensure refactor)
- [x] Tests (happy path + error path)
- [x] UID-based system IDS using crypto.randomUUID()

### ID Strategy (Phase 1 Requirement)

All system identifiers (`id`, `classId`, `authorId`) are generated using: `crypto.randomUUID()`

IDs are treated as opaque strings and are never parsed or coerced to numbers.

This ensures:

- Rubric compliance (Phase 1 requirement)
- Stable identity before database integration
- Easier to update for Phase 2 requirements

### Authentication (Phase 1)

Authentication is implemented using JSON Web Tokens (JWT).

Passwords are hashed using bcrypt before being stored in memory.

On successful registration or login, the API returns a signed JWT token.

Protected routes must include:

Authorization: Bearer <token>

JWT payload includes:

```
{

"sub": "<userId>"

}
```

The `sub` claim is used to enforce ownership of resources at the application layer.

Authentication errors return consistent 401 responses using the global error handler.

#### Classes Resource (Phase 1)

The `classes` resource represents globally visible competition classes.

#### Public Endpoints

##### GET `/classes`

Returns a paginated list of all classes.

Query parameters (optional):

- limit
- page (internally converted to offset)

Example response:

```
{
     "ok": true,
     "requestId": "uuid",
     "data": [
         { "id": **"550e8400-e29b-41d4-a716-446655440000"**,
           "className": **"Hunter Under Saddle"**,
           "authorId": **"user-uuid"** }
              ],
     "meta": {
     "pagination": {
          "limit": 20,
          "page": 1,
          "total": 1
      }
   }
}
```

##### GET `/classes/:id`

Returns a single class by ID.

Returns 404 if not found.

#### Protected Endpoints (JWT Required)

##### POST `/classes`

##### PUT `/classes/:id`

##### DELETE `/classes/:id`

#### Ownership Model

Classes are globally visible.

Ownership is enforced only for:

- Updates
- Deletions

Ownership is determined via the `sub` claim in the JWT payload (`req.user.id`).

### Entries Resource (Phase 1)

The `entries` resource represents a horse’s enrollment in a specific class.

Each entry record contains:

```
{
  id,
  classId,
  horseName,
  authorId
}
```

Entries form a **one-to-many relationship** :

- One class → many entries
- Each entry belongs to exactly one class

#### Route Design

Phase 1 uses a hybrid route structure:

**Nested routes (collection operations):**

- `GET /classes/:classId/entries`
- `POST /classes/:classId/entries`

**Flat routes (single resource operations):**

- `PUT /entries/:entryId`
- `DELETE /entries/:entryId`

This design keeps:

- Listing/creation logically grouped under the parent class
- Update/delete operations simple and resource-oriented

#### Public Endpoints

##### GET `/classes/:classId/entries`

#### Protected Endpoints (JWT Required)

##### POST `/classes/:classId/entries`

##### PUT `/entries/:entryId`

##### DELETE `/entries/:entryId`

### Cascade Behavior

When a class is deleted:

- All entries belonging to that class are removed.
- This preserves in-memory integrity in Phase 1.

Cascade is handled at the application layer and will later transition to database-level cascading in Phase 2.

### Guard Pattern Consistency Pass (Pre-Testing Refactor)

Before implementing tests, I performed a validation and guard consistency pass across the `classes` and `entries` controllers.

#### What Was Updated

- Standardized use of `ensure(condition, error)` for guard logic.
- Replaced manual `if (...) throw` validation blocks with `ensure`.
- Fixed an inverted guard condition in `updateClass`:
  - Corrected to:`ensure(Object.keys(updates).length > 0, badRequest('No updatable fields provided'));`

### Test Coverage (Phase 1)

Phase 1 includes integration-level API tests using **Vitest** and **Supertest** .

Test coverage satisfies the rubric minimum:
2 happy paths, 2 error paths (validation + not found), and 1 authentication rejection test.

Run tests with: `npm run test`

Tests cover:

#### Authentication

- Register user (201)
- Login user (200)
- JWT token returned on success

#### Classes Resource

- 401 when creating without auth
- 201 create class
- 200 list classes with pagination meta
- 403 wrong owner cannot update
- 204 owner can delete
- 404 delete not found
- 400 update with empty body

#### Entries Resource

All tests run against a fresh in-memory repository instance per test to ensure isolation

Nested routes:

- 201 create entry under class
- 200 list entries for class

Flat routes:

- 200 update entry
- 204 delete entry
- 400 update with empty body
- 404 entry not found
- 403 wrong owner cannot update

All tests run against a fresh in-memory repository instance per test to ensure isolation.

### Tech Stack (Phase 1)

- Node.js (ES Modules)
- Express
- Helmet (security headers)
- Morgan (request logging)
- dotenv (environment variables)
- jsonwebtoken (JWT authentication)
- bcryptjs (password hashing)
- Vitest
- Supertest
- ESLint
- Prettier
- Vitest + Supertest (integration-level API testing)

### Project Structure

```
.env.example
src/
  createApp.js
  server.js
  controllers/
  middleware/
  repos/
  routes/
  utils/
tests/
.github/workflows/
tests/ → Integration tests (health, auth, classes, entries)
```

The project uses Node’s `"imports"` alias mapping to avoid long relative paths.

## How to Run/Install

### Environment Setup

This project uses environment variables for configuration.

#### 1. Copy the example file

Bash: `cp .env.example .env`

Windows PowerShell: `copy .env.example .env`

#### 2. Update the values inside `.env`

```
PORT=3005
JWT_SECRET=your-super-long-random-string-32+chars
```

### Required Variables (Phase 1 Minimum)

To run the API in **Phase 1 (in-memory mode)** , only the following are required:

```
PORT=3005
JWT_SECRET=your-super-long-random-string-32+chars
```

- **PORT** — Port the server will run on
- **JWT_SECRET** — Secret used to sign JWT tokens (must be 32+ characters)

Environment variables are validated at startup.

If invalid, the application will fail fast and refuse to boot.

### Additional Variables (Phase 2 – Database Mode)

To run **Phase 2 (Prisma + Supabase)** , the following must also be configured:

```
DATABASE_URL=...
DIRECT_URL=...
SUPABASE_DB_PASSWORD=...
PRISMA_SQL_SUPABASE_PASSWORD=...
```

These values are provided by Supabase.

### Running the Server

Install dependencies: `npm install`

Start development server: `npm run dev`

You should see: `IT'S ALIVE!!! This app listening on http://localhost:3005 `

If Phase 2 environment variables are configured, the API will run using Prisma-backed repositories.

If not, it can still run Phase 1 (in-memory) logic.

## Scripts

- Development: `npm run dev`
- Lint: `npm run lint`
- Auto-fix lint issues: `npm run lint:fix`
- Check formatting: `npm run format:check`
- Write formatting: `npm run format:write`
- Run tests: `npm run test`

### Database Scripts (Phase 2)

These scripts are only required when running Phase 2.

- Generate Prisma client: `npx prisma generate`
- Create migration (dev): `npx prisma migrate dev`
- Apply migrations (CI/prod): `npx prisma migrate deploy`
- Seed database: `npx prisma db seed`
- Reset database safely: `npm run db:reset`

This script:

- Deletes records in dependency order
- Reseeds predictable demo data
- Preserves schema and migration history

Use this before integration testing or manual Postman validation.

## Author Notes

This project intentionally separates system identity (`id`) from domain identity (e.g., class numbers) to allow safe internal references and future schema evolution.

The architecture is structured early to support a smooth migration to a database-backed implementation in Phase 2.

### Architecture

This project uses a layered structure:

- **server.js** → application entry point
- **createApp.js** → Express app factory
- **middleware/** → reusable middleware
- **controllers/** → request handling logic
- repos/ → data layer (in-memory in Phase 1, Prisma-backed in Phase 2)
- **routes/** → route definitions
- **utils/** → shared helpers (env, jwt, etc.)
- **tests/** → API tests

Phase 1 includes a one-to-many relationship (classes → entries) implemented with nested routes and application-level cascade deletion.

### Response & Error Envelope

All responses follow a consistent JSON envelope.

#### Success Response

```
{
  "ok": true,
  "requestId": "uuid",
  "data": { ... },
  "meta": {}
}
```

#### Error Response

```
{
  "ok": **false**,
  "error": {
    "code": **"NOT_FOUND"**,
    "message": **"Route not found"**,
    "details": **null**,
    "requestId": **"uuid"**
  }
}
```

This structure ensures:

- Stable frontend integration
- Predictable error handling
- Easy request tracing via `requestId`

#### Prisma Error Mapping (Phase 2)

Phase 2 introduces database-level constraint enforcement.

To preserve the API contract, the global error handler maps known Prisma errors into structured HTTP responses.

Mapped Prisma error codes:

- `P2002` → `409 Conflict` (unique constraint violation)
- `P2003` → `409 Conflict` (foreign key constraint violation)
- `P2025` → `404 Not Found` (record not found)

All mapped errors are converted into the standard response envelope:

```
{
  "ok": false,
  "error": {
    "code": "unique_constraint",
    "message": "A record with these unique fields already exists.",
    "details": null,
    "requestId": "uuid"
  }
}
```

This ensures:

- Database errors do not leak internal implementation details
- Clients receive consistent HTTP semantics
- The API contract remains stable between Phase 1 and Phase 2

### Health Check Endpoint

GET `/health`

Example response:

```
{
  "ok": true,
  "requestId": "uuid",
  "data": { "status": "ok" }
}
```

This confirms:

- Server booted
- Middleware loaded
- JSON parsing works
- Security headers active

### Authentication Endpoints

#### POST `/auth/register`

Request body:

{
"email": "user@example.com",
"password": "securePassword"
}

Returns a signed JWT token on success.

#### POST `/auth/login`

Request body:

{
"email": "user@example.com",
"password": "securePassword"
}

Returns a signed JWT token on success.

### Request Correlation

Every request receives a unique `requestId`.

- Reuses incoming `X-Request-Id` header if provided
- Otherwise generates a UUID
- Echoes the value back in the `X-Request-Id` response header
- Includes it in all response envelopes

This enables easier debugging and production log tracing.

> Note: In future production versions, route details may be removed from client-facing error messages and retained only in logs.

## Phase 2 – Prisma + Supabase Integration

Phase 2 replaces in-memory storage with **Supabase Postgres** using **Prisma ORM v7** , while preserving the API contract from Phase 1.

Routes, response envelope, authentication, and ownership rules remain unchanged.

Only the persistence layer is swapped.

### Phase 2 Goals

- [x] Install Prisma ORM v7
- [x] Configure `prisma.config.js` (Prisma v7 datasource requirement)
- [x] Connect to Supabase Postgres
- [x] Define relational schema (User → Class → Entry)
- [x] Create and run migration
- [x] Implement seed and safe reset scripts
- [x] Replace in-memory repositories with Prisma-backed repositories
- [x] CI database integration (Postgres service container)
- [x] Prisma error mapping (409 handling)
- [x] Updated test files and run them successfully

### Tech Stack (Updated for Phase 2)

- Node.js (ES Modules)
- Express
- Prisma ORM v7
- Supabase Postgres
- jsonwebtoken
- bcryptjs
- Vitest
- Supertest
- ESLint
- Prettier

### Project Structure (Phase 2 Additions)

Phase 2 retains the same layered structure from Phase 1, with the following additions:

prisma/
  schema.prisma
  prisma.config.js
  seed.js
  seedData.js

scripts/
  dbReset.js

docs/
  rls-notes.md

.github/workflows/
  ci.yml

The repository layer was swapped from in-memory arrays to Prisma-backed repositories without changing the controller or route structure.

### Prisma Initialization

Prisma was integrated into the existing project structure rather than bootstrapped from scratch.

Instead of running `prisma init`, the required configuration and scripts were:

- Added manually to the project
- Installed via `npm install`
- Configured using Prisma v7 conventions

Dependencies:
`npm install prisma @prisma/client`

Prisma v7 uses a separate configuration file:

- `prisma.config.js`

The datasource connection is configured via environment variables:

```
DATABASE_URL=...
DIRECT_URL=...
```

After configuration was complete, the Prisma client was generated:
`npx prisma generate`

This ensured the client matched the defined schema before running migrations.

### Database Schema

Phase 2 introduces a relational schema using Prisma.

#### Models

- **User**
- **Class**
- **Entry**

#### Relationships

- One User → many Classes
- One Class → many Entries
- Each Entry belongs to:
  - One Class
  - One User (author)

#### ID Strategy (Phase 2)

In Phase 1, IDs were generated using `crypto.randomUUID()`.

In Phase 2, UUIDs are generated at the **database level** using Prisma schema definitions.

This removes ID generation responsibility from the application layer while preserving opaque string identifiers.

### Migrations

After defining the schema, a migration was created:
`npx prisma migrate dev --name init`

This:

- Generated SQL migration files
- Applied the schema to Supabase Postgres
- Updated the Prisma client

For CI or production environments: `npx prisma migrate deploy`

### Seeding & Safe Reset

Phase 2 includes deterministic seed helpers:

- `prisma/seedData.js`
- `prisma/seed.js`
- `scripts/dbReset.js`

#### Seed Strategy

- Deletes records in dependency order:
  - entries → classes → users
- Inserts predictable demo data
- Does NOT drop the schema
- Safe for remote Supabase development

Run seed: `npx prisma db seed`

Run safe reset: `npm run db:reset`

The reset script clears data and reseeds without destroying migrations.

### Repository Migration (Engine Swap)

All repositories were migrated from:

- In-memory arrays (Phase 1)

to:

- Prisma client queries (Phase 2)

Example transformation:

**Phase 1:** `classes.push(newClass);`

**Phase 2:** `prisma.class.create({ data: {...} });`

#### Pagination Strategy

Phase 1 used manual windowing logic.

In Phase 2, pagination is delegated directly to the database via Prisma query options.

The repositories use:

- `take` → limit
- `skip` → offset
- `orderBy` → deterministic ordering

Example:

```
prisma.class.findMany({
  take: limit,
  skip: offset,
  orderBy: { id: 'asc' }
})
```

This ensures:

- Deterministic ordering
- Efficient database-level windowing
- Identical API response structure to Phase 1

The API contract remains unchanged:

- Controllers still return pagination metadata
- Response envelope remains consistent
- Clients are unaffected by the persistence swap

#### Include Strategy

`GET /classes` remains intentionally lean.

It returns:

- Class records
- Pagination metadata

Future roadmap enhancement:

- Add `_count.entries` to list endpoint
- Add entry inclusion on `GET /classes/:id` for full roster view

These are planned extensions and do not alter the current API contract.

### Repository Completion (Users + Entries)

This checkpoint completes the repository swap for all remaining resources.

#### Users Repository

The in-memory `users` repository was replaced with a Prisma-backed implementation.

The repository now uses:

- `prisma.user.create`
- `prisma.user.findUnique`

Methods implemented:

- `create`
- `findByEmail`
- `findById`

Authentication flow remains unchanged:

- Password hashing still occurs in the password utility.
- JWT logic remains in middleware.
- Controllers were not rewritten.

Return contracts remain consistent with Phase 1 expectations.

#### Entries Repository

The in-memory `entries` repository was replaced with Prisma queries.

Implemented methods:

- `listByClassId`
- `getById`
- `create`
- `update`
- `delete`
- `findByIdForAuthor`

Ownership enforcement remains inside the repository layer:

- `null` → not found
- `'forbidden'` → wrong owner

Pagination now uses Prisma windowing:

- `take`
- `skip`

Deterministic ordering is enforced using:`orderBy: { id: 'asc' }`

Controllers were not modified during this migration, confirming the abstraction boundary remains intact.

#### Repository Factory Refactor

The `createRepos` factory was updated to initialize all Prisma-backed repositories:

```
return {
  classes: createClassesRepo(prisma),
  users: createUsersRepo(prisma),
  entries: createEntriesRepo(prisma),
};
```

The repository keys remain unchanged.

Controllers continue accessing repositories through: `res.locals.repos`

This confirms the engine swap did not alter the application contract.

#### Shared Prisma Client

A single Prisma client instance is created in:
`src/db/prisma.js`

Repositories receive the Prisma client through dependency injection.

No repository or controller instantiates Prisma directly.

This ensures:

- Connection reuse
- Predictable lifecycle management
- Clean separation of infrastructure and business logic

#### Removal of Phase 1 Windowing Helpers

Phase 1 used an internal helper (`applyWindow`) to manually slice in-memory arrays for pagination.

In Phase 2, pagination is delegated directly to Prisma using:

- `take`
- `skip`
- `orderBy`

Because the database now handles windowing, the `applyWindow` helper was removed.

This simplifies the repository layer and eliminates redundant in-memory slicing logic.

### Controller Async Alignment (Phase 2 Adjustment)

In Phase 1, repositories were synchronous (in-memory arrays).

After migrating to Prisma in Phase 2, all repository methods became asynchronous.

To preserve the API contract:

- All controller handlers were converted to `async`
- All repository calls were updated to use `await`
- No route signatures or response shapes were modified

This confirms that the controller layer remains storage-agnostic.

The HTTP contract did not change — only the persistence engine did.

### Testing Strategy

Phase 2 transitions testing from an in-memory data layer to a real Postgres-backed environment using Prisma.

The API contract remains unchanged.

However, the persistence model introduces important testing adjustments.

#### What Changed from Phase 1

In Phase 1:

- Repositories were synchronous
- Each test ran against a fresh in-memory instance
- IDs were generated using `crypto.randomUUID()`

In Phase 2:

- Repositories are asynchronous
- IDs are generated at the database level (UUID)
- Tests interact with a real Postgres database

The test suite was updated to account for these changes without modifying the API surface.

#### Test Isolation Strategy

Tests now:

- Instantiate a new Express app per test
- Inject Prisma-backed repositories
- Create unique users using timestamp-based emails
- Avoid assumptions about database emptiness
- Avoid hard-coded IDs

Example unique email pattern used in tests:
`const email = `bob+${Date.now()}@example.com`;`

This prevents unique constraint conflicts (`P2002` or `409`) during repeated test runs.

Tests pass consistently when executed multiple times in succession.

#### Error Mapping Validation

Phase 2 tests implicitly validate Prisma error mapping.

For example:

- Unique constraint violations return `409`
- Missing records return `404`
- Foreign key violations return `409`
- Ownership violations return `403`

All responses continue to use the standardized response envelope.

This confirms:

- Database-level constraints are active
- The global error handler properly maps Prisma error codes
- The API contract remains stable

#### Pagination Validation

Pagination tests validate:

- `limit`
- `page`
- `total`

Rather than asserting exact totals, tests use:`toBeGreaterThanOrEqual(...)`

This prevents failures when persistent test data accumulates.

Pagination behavior is delegated to Prisma using:

- `take`
- `skip`
- `orderBy`

The API response format remains identical to Phase 1.

#### Test Execution

Run all tests: `npm run test`

Phase 2 tests run against the configured Postgres database.

If needed, reset the database safely using: `npm run db:reset`

This clears data and reseeds predictable demo records without dropping migrations.

This confirms that:

- The engine swap did not break the API contract
- Persistence moved to Postgres
- Prisma integration is stable
- The system behaves consistently under repeated test execution

### Continuous Integration (Phase 2)

Phase 2 includes a GitHub Actions workflow that runs on pull requests and pushes to `main`.

The CI pipeline performs:

- install dependencies
- lint
- prisma generate
- prisma migrate deploy
- run tests

CI runs against a temporary Postgres service container, not the remote Supabase database.

This confirms that:

- migrations apply cleanly in a fresh environment
- the test suite passes against a real Postgres database
- Phase 2 requirements are satisfied without relying on local state

### RLS Notes (Phase 2)

This repo includes a required Phase 2 write-up:

- `docs/rls-notes.md`

This document explains:

- what Row Level Security (RLS) is
- why service/admin database roles can bypass RLS
- why database-level authorization is defense in depth
- how `auth.uid()` would map to `authorId` using Supabase Auth
- an example “only owner can update” policy (pseudo-SQL)

