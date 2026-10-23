# TalentSync

> Enterprise Talent Orchestration, Pipeline Synchronization, and Candidate Intelligence Platform.

Built with **Node.js**, **TypeScript**, and **React 19** using an npm workspaces monorepo architecture.

---

## 🧰 Technology Stack

| Area | Technologies |
| :--- | :--- |
| Frontend | React 19, React DOM, Vite 6 |
| Backend | Node.js 24, Fastify 5, `@fastify/cors` |
| Database | PostgreSQL 17, Drizzle ORM, node-postgres (`pg`) |
| Language & tooling | TypeScript 5, npm workspaces, tsx |
| Testing | Vitest |
| Local infrastructure | Docker Compose |

---

## 🏗 Architecture Overview

TalentSync is structured into modular workspaces for clean separation of concerns and type-safe cross-service communication:

```plaintext
talent-sync/
├── apps/
│   ├── client/          # Modern React 19 + Vite frontend application
│   │   ├── src/App.tsx  # Dynamic talent directory, job board & sync management
│   │   └── src/styles/  # Modern CSS design tokens, glassmorphism, responsive grid
│   └── server/          # Node.js + Fastify backend REST API
│       ├── src/app.ts   # Fastify setup, plugins, error handlers
│       └── src/routes/  # Health, Talents, Jobs, and ATS Sync routes
└── packages/
    └── shared/          # Shared domain models, TypeScript interfaces, and DTOs
```

---

## 🚀 Quick Start

Requires [nvm](https://github.com/nvm-sh/nvm), Docker Compose, and npm. From the repository root:

```bash
nvm install && nvm use   # Uses Node.js v24.19.0 from .nvmrc
npm install
docker compose up -d postgres
npm run db:push
npm run dev
```

- **Frontend Client**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:4000](http://localhost:4000)
- **API Health Check**: [http://localhost:4000/api/health](http://localhost:4000/api/health)

Run `nvm use` whenever you open a new shell in this project.

---

## 🛠 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Concurrently runs both Fastify API (`:4000`) and Vite frontend (`:3000`) |
| `npm run dev:server` | Runs only the Fastify TypeScript API server with instant hot reload (`tsx`) |
| `npm run dev:client` | Runs only the Vite React client |
| `npm run build` | Compiles `@talent-sync/shared`, `@talent-sync/server`, and `@talent-sync/client` |
| `npm test` | Runs automated test suite via **Vitest** |
| `npm run test:watch` | Runs Vitest in interactive watch mode |

---

## 🔌 API Endpoints

- `GET /api/health` - API server operational status, environment, and uptime
- `GET /api/items` - List guidance records via Drizzle ORM
- `GET /api/items/:id` - Retrieve guidance record by numeric ID
- `POST /api/items` - Create a new guidance record (`{ title, description }`)

---

## 🗄 Database & ORM (PostgreSQL + Drizzle ORM)

Located in `apps/server/src/db/`:
- **Drizzle Schema**: [schema.ts](file:///root/workspace/talent-sync/apps/server/src/db/schema.ts) (`drizzle-orm/pg-core`)
- **Drizzle Config**: [drizzle.config.ts](file:///root/workspace/talent-sync/apps/server/drizzle.config.ts) (`dialect: 'postgresql'`)
- **SQL Reference**: [schema.sql](file:///root/workspace/talent-sync/apps/server/src/db/schema.sql)
- **Database Client**: [database.ts](file:///root/workspace/talent-sync/apps/server/src/db/database.ts) using `drizzle-orm/node-postgres` (`pg`)

### Starting PostgreSQL via Docker
A ready-to-run [docker-compose.yml](file:///root/workspace/talent-sync/docker-compose.yml) is included:
```bash
docker compose up -d
```
Default connection URL:
```plaintext
postgresql://postgres:postgrespassword@localhost:5432/talentsync
```
