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

# 📁 Environment Configuration Files

Each environment uses its own .env file:

.env.development
.env.staging
.env.production

.gitignore to block .env files

✅ Verification

Verified that staging and production builds connect to different APIs

Confirmed secrets are loaded via environment variables

Checked Git history to ensure no secrets were committed

Tested builds locally and after deployment

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

🔐 Environment Variables & Secrets

To keep the deployment secure:

No secrets are committed to GitHub

.env files are ignored

API keys and credentials stored in GitHub Secrets

Accessed using process.env

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
