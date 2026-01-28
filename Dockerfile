# Stage 1: Build the frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy frontend dependencies
COPY package.json bun.lockb ./

# Install dependencies
RUN npm install

# Copy frontend source
COPY . .


# Build the frontend
RUN npm run build

# Stage 2: Build the backend and final image
FROM node:18-alpine

WORKDIR /app

# Copy backend dependencies
COPY backend/package.json backend/package.json
RUN cd backend && npm install --production

# Copy backend source
COPY backend/src backend/src
COPY backend/server.js backend/

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/dist ./public

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the backend server
CMD ["node", "backend/server.js"]
