# wk2-lvl4-api-project

This is a repo Phases 1 and 2 for my Level 4, Week 2 API project with CodeX.

## Overview

This project is part of a two-phase assignment:

* **Phase 1:** In-memory API (no database)
* **Phase 2:** Supabase Postgres + Prisma ORM v7 integration

Phase 1 focuses on:

* Clean application structure
* Environment validation
* Security best practices
* Consistent API response envelope
* Authentication (JWT)
* Ownership enforcement
* Test coverage

The goal is to build a stable, production-ready API foundation before introducing persistence.

## Table of Contents

* [Overview]()
* [Phase 1 – In-Memory Resource API]()

  * [Design Philosophy]()
  * [Phase 1 Goals]()
* [Future Phase (Phase 2 Preview)]()

  * [Tech Stack (Phase 1)]()
  * [Project Structure]()
* [How to Run/Install]()

  * [Environment Setup]()
  * [Running the Server]()
* [Scripts]()
* [Author Notes]()

  * [Architecture]()
  * [Health Check Endpoint]()
  * [Request Correlation]()

## Phase 1 – In-Memory Resource API

A structured Express API built for CodeX Level 4 Week 2.

This phase focuses exclusively on building a clean, production-structured API using **in-memory storage** (no database).

Future phases will replace in-memory storage with Supabase Postgres + Prisma ORM without changing the API contract.

### Design Philosophy

* Fail fast on invalid configuration
* Keep startup logic separate from app construction
* Maintain consistent response shape
* Enforce ownership at the application layer
* Prepare for database integration without refactoring the API contract

### Phase 1 Goals

* [x] Bootable Express server
* [x] Environment validation
* [x] Security middleware
* [x] Logging middleware
* [x] Global response helper
* [x] Global error handler
* [ ] JWT auth routes
* [ ] Primary resource (classes)
* [ ] Related resource (entries)
* [ ] Ownership enforcement
* [ ] Tests (happy path + error path)

## Future Phase (Phase 2 Preview)

Phase 2 will:

* Replace in-memory repositories with Prisma ORM
* Connect to Supabase Postgres
* Add migrations and seeding
* Add query features (include/filter/count)
* Add CI database integration

The API contract (routes + response format) will remain unchanged.

### Tech Stack (Phase 1)

* Node.js (ES Modules)
* Express
* Helmet (security headers)
* Morgan (request logging)
* dotenv (environment variables)
* jsonwebtoken (JWT auth)
* bcryptjs (password hashing)
* Vitest
* Supertest
* ESLint
* Prettier

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

* **PORT** — Port the server will run on
* **JWT_SECRET** — Secret used to sign JWT tokens (must be 32+ characters)

Environment variables are validated at startup.

If invalid, the application will fail fast and refuse to boot.

### Running the Server

Install dependencies: `npm install`

Start development server: `npm run dev`

You should see: `App listening on http://localhost:3005 `

## Scripts

Development: `npm run dev`

Lint: `npm run lint`

Auto-fix lint issues: `npm run lint:fix`

Check formatting: `npm run format:check`

Write formatting: `npm run format:write`

Run tests: `npm run test`

## Author Notes

This project intentionally separates system identity (`id`) from domain identity (e.g., class numbers) to allow safe internal references and future schema evolution.

The architecture is structured early to support a smooth migration to a database-backed implementation in Phase 2.

### Architecture

This project uses a layered structure:

* **server.js** → application entry point
* **createApp.js** → Express app factory
* **middleware/** → reusable middleware
* **controllers/** → request handling logic
* **repos/** → in-memory data layer (Phase 1)
* **routes/** → route definitions
* **utils/** → shared helpers (env, jwt, etc.)
* **tests/** → API tests

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
  "ok": false,
  "requestId": "uuid",
  "error": {
    "code": "not_found",
    "message": "Route not found"
  }
}
```

This structure ensures:

* Stable frontend integration
* Predictable error handling
* Easy request tracing via `requestId`

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

* Server booted
* Middleware loaded
* JSON parsing works
* Security headers active

### Request Correlation

Every request receives a unique `requestId`.

* Reuses incoming `X-Request-Id` header if provided
* Otherwise generates a UUID
* Echoes the value back in the `X-Request-Id` response header
* Includes it in all response envelopes

This enables easier debugging and production log tracing.

> Note: In future production versions, route details may be removed from client-facing error messages and retained only in logs.

