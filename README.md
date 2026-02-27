# wk2-lvl4-api-project

This is a repo Phases 1 and 2 for my Level 4, Week 2 API project with CodeX.

## Overview

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

## Table of Contents

## Table of Contents

- [Overview]()
- [Phase 1 – In-Memory Resource API]()
  - [Design Philosophy]()
  - [Phase 1 Goals]()
  - [ID Strategy (Phase 1 Requirement)]()
  - [Authentication (Phase 1)]()
  - [Classes Resource (Phase 1)]()
  - [Entries Resource (Phase 1)]()
  - [Cascade Behavior]()
  - [Guard Pattern Consistency Pass]()
  - [Test Coverage (Phase 1)]()
- [How to Run/Install]()
  - [Environment Setup]()
  - [Running the Server]()
- [Scripts]()
- [Author Notes]()
  - [Architecture]()
  - [Response & Error Envelope]()
  - [Health Check Endpoint]()
  - [Authentication Endpoints]()
  - [Request Correlation]()
- [Phase 2 – Prisma + Supabase Integration]()
  - [Phase 2 Goals]()
  - [Tech Stack (Phase 2)]()
  - [Prisma Initialization]()
  - [Database Schema]()
  - [Migrations]()
  - [Seeding & Safe Reset]()
  - [Repository Migration (Engine Swap)]()

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

* Rubric compliance (Phase 1 requirement)
* Stable identity before database integration
* Easier to update for Phase 2 requirements

### Authentication (Phase 1)

Authentication is implemented using JSON Web Tokens (JWT).

Passwords are hashed using bcrypt before being stored in memory.

On successful registration or login, the API returns a signed JWT token.

Protected routes must include:

Authorization: Bearer <token>

JWT payload includes:

{
"sub": "<userId>"
}

The `sub` claim is used to enforce ownership of resources at the application layer.

Authentication errors return consistent 401 responses using the global error handler.

#### Classes Resource (Phase 1)

The `classes` resource represents globally visible competition classes.

#### Public Endpoints

##### GET `/classes`

Returns a paginated list of all classes.

Query parameters (optional):

* limit
* page (internally converted to offset)

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

Authorization header required:
`Authorization: Bearer <token>`

##### POST `/classes`

Creates a new class owned by the authenticated user.

Request body:

```
{
  "className": "Hunter Under Saddle"
}
```

Returns 201 Created.

##### PUT `/classes/:id`

Updates a class if owned by the authenticated user.

Returns:

- 200 on success
- 404 if not found
- 403 if not owner
- 400 if no updatable fields provided

##### DELETE `/classes/:id`

Deletes a class if owned by the authenticated user.

Returns:

- 204 No Content
- 404 if not found
- 403 if not owner

##### Ownership Model

Classes are globally visible.

Ownership is enforced only for:

- Updates
- Deletions

Ownership is determined via the `sub` claim in the JWT payload (`req.user.id`).

#### Entries Resource (Phase 1)

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

##### Route Design

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

##### Public Endpoint

###### GET `/classes/:classId/entries`

Returns a paginated list of entries for a specific class.

Query parameters (optional):

- `limit`
- `page`

Returns:

- 200 with paginated entries
- 404 if class does not exist

##### Protected Endpoints (JWT Required)

Authorization header required: `Authorization: Bearer <token>`

##### POST `/classes/:classId/entries`

Creates a new entry under a specific class.

Request body:

```
{
  "horseName": "Rocket"
}
```

Returns:

- 201 Created
- 404 if class does not exist

##### PUT `/entries/:entryId`

Updates an entry if owned by the authenticated user.

Returns:

- 200 on success
- 404 if entry not found
- 404 if parent class no longer exists
- 403 if not owner

##### DELETE `/entries/:entryId`

Deletes an entry if owned by the authenticated user.

Returns:

- 204 No Content
- 404 if entry not found
- 404 if parent class no longer exists
- 403 if not owner

#### Cascade Behavior

When a class is deleted:

- All entries belonging to that class are removed.
- This preserves in-memory integrity in Phase 1.

Cascade is handled at the application layer and will later transition to database-level cascading in Phase 2.

#### Guard Pattern Consistency Pass (Pre-Testing Refactor)

Before implementing tests, I performed a validation and guard consistency pass across the `classes` and `entries` controllers.

#### What Was Updated

- Standardized use of `ensure(condition, error)` for guard logic.
- Replaced manual `if (...) throw` validation blocks with `ensure`.
- Fixed an inverted guard condition in `updateClass`:
  - Corrected to:`ensure(Object.keys(updates).length > 0, badRequest('No updatable fields provided'));`

## Test Coverage (Phase 1)

Phase 1 includes integration-level API tests using **Vitest** and **Supertest** .

Test coverage satisfies the rubric minimum:
2 happy paths, 2 error paths (validation + not found), and 1 authentication rejection test.

Tests cover:

### Authentication

- Register user (201)
- Login user (200)
- JWT token returned on success

### Classes Resource

- 401 when creating without auth
- 201 create class
- 200 list classes with pagination meta
- 403 wrong owner cannot update
- 204 owner can delete
- 404 delete not found
- 400 update with empty body

### Entries Resource

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

Run tests with: `npm run test`

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
  Vitest + Supertest (integration-level API testing)

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
tests/ → Integration tests (auth, classes, entries)
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

### Required Variables

- **PORT** — Port the server will run on
- **JWT_SECRET** — Secret used to sign JWT tokens (must be 32+ characters)

Environment variables are validated at startup.

If invalid, the application will fail fast and refuse to boot.

### Running the Server

Install dependencies: `npm install`

Start development server: `npm run dev`

You should see: `App listening on http://localhost:3005 `

## Scripts

- Development: `npm run dev`
- Lint: `npm run lint`
- Auto-fix lint issues: `npm run lint:fix`
- Check formatting: `npm run format:check`
- Write formatting: `npm run format:write`
- Run tests: `npm run test`

### Database Scripts (Phase 2)

- Generate Prisma client: `npx prisma generate`
- Create migration (dev): `npx prisma migrate dev`
- Apply migrations (CI/prod): `npx prisma migrate deploy`
- Seed database: `npx prisma db seed`
- Reset database safely: `npm run db:reset`

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

## Phase 2 Goals

* [x] Install Prisma ORM v7
* [x] Configure `prisma.config.js` (Prisma v7 datasource requirement)
* [x] Connect to Supabase Postgres
* [x] Define relational schema (User → Class → Entry)
* [x] Create and run migration
* [x] Implement seed and safe reset scripts
* [x] Replace in-memory repositories with Prisma-backed repositories
* [ ] CI database integration (Postgres service container)
* [ ] Prisma error mapping (409 handling)

### Tech Stack (Updated for Phase 2)

* Node.js (ES Modules)
* Express
* Prisma ORM v7
* Supabase Postgres
* jsonwebtoken
* bcryptjs
* Vitest
* Supertest
* ESLint
* Prettier

### Prisma Initialization

Prisma was integrated into the existing project structure rather than bootstrapped from scratch.

Instead of running `prisma init`, the required configuration and scripts were:

* Added manually to the project
* Installed via `npm install`
* Configured using Prisma v7 conventions

Dependencies:
`npm install prisma @prisma/client`

Prisma v7 uses a separate configuration file:

* `prisma.config.js`

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

* **User**
* **Class**
* **Entry**

#### Relationships

* One User → many Classes
* One Class → many Entries
* Each Entry belongs to:
  * One Class
  * One User (author)

#### ID Strategy (Phase 2)

In Phase 1, IDs were generated using `crypto.randomUUID()`.

In Phase 2, UUIDs are generated at the **database level** using Prisma schema definitions.

This removes ID generation responsibility from the application layer while preserving opaque string identifiers.

### Migrations

After defining the schema, a migration was created:
`npx prisma migrate dev --name init`

This:

* Generated SQL migration files
* Applied the schema to Supabase Postgres
* Updated the Prisma client

For CI or production environments: `npx prisma migrate deploy`

### Seeding & Safe Reset

Phase 2 includes deterministic seed helpers:

* `prisma/seedData.js`
* `prisma/seed.js`
* `scripts/dbReset.js`

#### Seed Strategy

* Deletes records in dependency order:
  * entries → classes → users
* Inserts predictable demo data
* Does NOT drop the schema
* Safe for remote Supabase development

Run seed: `npx prisma db seed`

Run safe reset: `npm run db:reset`

The reset script clears data and reseeds without destroying migrations.

### Repository Migration (Engine Swap)

All repositories were migrated from:

* In-memory arrays (Phase 1)

to:

* Prisma client queries (Phase 2)

Example transformation:

**Phase 1:** `classes.push(newClass);`

**Phase 2:** `prisma.class.create({ data: {...} });`

#### Pagination Strategy

Phase 1 used manual windowing logic.

Phase 2 uses Prisma query options:

* `take` → limit
* `skip` → offset
* `orderBy` → deterministic ordering

This preserves API behavior while delegating windowing to the database.

#### Include Strategy

`GET /classes` remains intentionally lean.

It returns:

* Class records
* Pagination metadata

Future roadmap enhancement:

* Add `_count.entries` to list endpoint
* Add entry inclusion on `GET /classes/:id` for full roster view

These are planned extensions and do not alter the current API contract.

