🚆 Real-Time Local Train Commute Assistant

A college-level web project that helps local train commuters view real-time delay information and make better travel decisions during disruptions.

📌 Project Concept
Concept-1: Advanced Data Fetching – Dynamic Rendering (App Router)

This project focuses on Dynamic Rendering using the Next.js App Router, which is the most suitable approach for a small, real-time, non-scalable application.

🧠 Why Dynamic Rendering?
Project Constraints

Small user base

No large-scale traffic expectations

Real-time data is more important than performance optimization

Simple architecture preferred over complex caching or hybrid strategies

🔁 Rendering Strategy Used
✅ Dynamic Rendering (Server-Side Rendering)

Data is fetched on every request

Always shows latest train delay data

No build-time or caching complexity

Easier to implement and maintain for a college project

❌ Why Static or Hybrid Rendering Was Not Used

# 🌍 Multi-Environment Setup

This project is configured to run in three separate environments, each with its own configuration and behavior.

Environments Used
Environment	Purpose
Development	Local development and testing
Staging	Pre-production testing
Production	Live deployed application

## 📁 Environment Configuration Files

Each environment uses its own `.env` file. For local development you should:

- Create a `.env.local` file in the project root (not committed)
- Keep a `.env.example` file in the project root (committed) as the template

The `.gitignore` is configured as:

- `.env*` — ignore all env files by default  
- `!.env.example` — but always keep the example template in Git

This ensures your real secrets never leave your machine while still documenting what is required to run the app.

## 🔐 Environment Variables & Secrets

Use the following variables in your env files:

- **Server-side only (never exposed to the browser):**
  - `DATABASE_URL` – connection URL for your primary database (e.g. PostgreSQL / MongoDB)
  - `BACKEND_API_BASE_URL` – base URL for your backend service (used on the server or API routes)
  - `FIREBASE_ADMIN_PROJECT_ID`, `FIREBASE_ADMIN_CLIENT_EMAIL`, `FIREBASE_ADMIN_PRIVATE_KEY` – Firebase Admin SDK credentials

- **Client-safe (exposed to the browser – must start with `NEXT_PUBLIC_`):**
  - `NEXT_PUBLIC_API_BASE_URL` – base URL for API requests from the Next.js frontend
  - `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`, `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID` – public Firebase config used by the client SDK
  - `NEXT_PUBLIC_APP_ENV` – optional flag (`development` | `staging` | `production`) for client-side behavior toggles

### ✅ Safe Usage in Next.js

- **Server-side access (safe for secrets):**
  - Example: `const dbUrl = process.env.DATABASE_URL;`  
  - Use only in server components, API routes, backend services, and any Node.js-only code.

- **Client-side access (must be `NEXT_PUBLIC_`):**
  - Example: `const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;`  
  - Only variables prefixed with `NEXT_PUBLIC_` are available in client components/hooks.

To avoid leaking secrets:

- Do **not** read `DATABASE_URL` or other non-`NEXT_PUBLIC_` variables in client components or hooks.
- Keep all sensitive logic (DB queries, privileged API calls, secret tokens) inside server code.
- When in doubt, treat anything without `NEXT_PUBLIC_` as secret and server-only.

### 🧩 How to Set Up Locally

1. Copy the template:  
   - `cp .env.example .env.local`
2. Replace all placeholder values in `.env.local` with your real credentials.
3. Restart the Next.js dev server so that changes to env vars are picked up.

### 🧠 Common Pitfalls Avoided

- **Accidentally exposing secrets:**  
  - Only `NEXT_PUBLIC_*` vars are exposed to the browser; everything else stays on the server.
- **Committing secrets:**  
  - `.env.local` is ignored by Git via `.env*`, and only `.env.example` is tracked.
- **Runtime vs build-time issues:**  
  - For Next.js, add or change env vars **before** building/deploying. If you change env vars in production, you often need to trigger a rebuild/redeploy so they take effect.

🚀 Benefits for This Project

🔄 Always up-to-date delay information

🧠 Simple and easy-to-understand architecture

🛠️ Faster development within a 4-week sprint

🎓 Ideal for academic evaluation

🐳 Docker: Containerizing the Application

To ensure consistency across environments, the application was containerized using Docker.

A Docker image packages the app, runtime, and dependencies

A container is a running instance of that image

Docker eliminates “works on my machine” issues

Implementation:

Separate Dockerfiles for frontend and backend

Environment variables passed at runtime

Docker Compose used for local multi-service setup

🔁 CI/CD: Automating Build & Deployment

To automate the workflow, GitHub Actions was used to build and deploy the project.

CI/CD Flow

Code pushed to GitHub

GitHub Actions triggers the pipeline

App is built and tested

Docker image is created

Image is deployed to the cloud

☁️ Cloud Deployment (AWS / Azure)

The containerized application was deployed to the cloud using managed services.

Backend hosted on AWS EC2 / Azure App Service

Frontend served via cloud hosting

Secrets managed using GitHub Secrets

These rules also apply to CI/CD and cloud deployment:

- No secrets are committed to GitHub; use environment-level config or GitHub Secrets.
- `.env`-style files used in CI are never added to the repo.
- All secrets are accessed via `process.env` in server-side code only.

🛠️ Tech Stack

Frontend: Next.js (App Router)

Backend: Node.js, Express

Database: MongoDB

Real-Time & Auth: Firebase

Deployment: Vercel (Frontend)


📁 Project Folder Structure
root
├── frontend
│   └── src
│       ├── app
│       ├── components
│       └── lib
└── backend

📌 Purpose of Each Folder
frontend/

Contains the Next.js (TypeScript) frontend application.

src/app/

Uses Next.js App Router

Contains route-based pages, layouts, and server components

Handles routing and page-level logic

src/components/

Reusable UI components (Navbar, Cards, Forms, Modals)

Purely presentational or lightly stateful components

src/lib/

Shared utilities and helpers

API clients, configuration files, constants, and reusable logic

backend/

Contains backend-specific logic and services (to be expanded).

Will handle:

APIs / services

Database access

Business logic

Authentication, caching, integrations

🏷️ Naming Conventions

Folders: kebab-case or camelCase (consistent across project)

Components: PascalCase
Example: UserCard.tsx

Utilities & helpers: camelCase
Example: fetchUser.ts

Routes (Next.js): Follow App Router conventions
Example: /dashboard, /profile

## Docker Setup

### Dockerfile Explanation

- Uses Node.js 20 Alpine image for lightweight builds
- Installs dependencies inside the container
- Builds the Next.js application
- Exposes port 3000 and starts the production server

### Docker Compose Services

- **app**
  - Runs the Next.js application
  - Exposes port 3000
  - Uses environment variables for database and Redis

- **db**
  - PostgreSQL 15 database container
  - Uses a named volume for data persistence

- **redis**
  - Redis 7 in-memory cache

### Networking

All services run in a shared bridge network (`localnet`) allowing container-to-container communication.

### Volumes

- `db_data` persists PostgreSQL data across container restarts.

### How to Run

```bash
docker-compose up --build


🚀 Scalability & Clarity Benefits

Clear separation of concerns between frontend and backend

Modular frontend structure makes components reusable and easy to maintain

App Router-based routing supports scalable page and layout management

lib folder centralizes shared logic, reducing duplication

Structure is cloud-ready and CI/CD friendly, making future AWS/Azure deployment easier

<img width="1447" height="1122" alt="Screenshot 2026-01-08 134747" src="https://github.com/user-attachments/assets/eb066400-f653-44a8-8962-d81c035c862c" />


### Migration Workflow

- `npx prisma migrate dev --name <migration_name>`
  - Creates migration files
  - Applies schema changes to the database
  - Updates Prisma Client

- `npx prisma migrate reset`
  - Resets the database
  - Re-applies all migrations
  - Re-runs seed data (development only)

### Rollback Strategy

- Rollbacks are handled by resetting the database in development
- Production migrations are tested in staging before deployment
- Database backups are taken before applying production migrations

### Seed Script

Seed data is inserted using `prisma/seed.ts`:

- Adds initial users
- Uses `skipDuplicates` to ensure idempotency

## API Routes & REST Design

### API Route Hierarchy

- GET /api/users
- POST /api/users
- GET /api/users/:id
- DELETE /api/users/:id

### HTTP Verbs & Actions

- GET – Fetch resources
- POST – Create new resources
- DELETE – Remove resources

Global Response Handler

A shared utility (lib/responseHandler.ts) is used across all API routes to enforce this standard format for both success and error responses.

This ensures:

Consistent API behavior

Easier frontend error handling

Better logging and observability


nput Validation with Zod

All API inputs are validated using Zod to ensure data correctness and prevent invalid requests from reaching business logic or the database.

Validation schemas are defined in lib/schemas/

API routes validate request bodies before processing

Invalid inputs return structured, readable error messages

Schemas are reusable on both client and server