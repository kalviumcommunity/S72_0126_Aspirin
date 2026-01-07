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

