# Base image
FROM node:18-alpine AS base

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Set the working directory in the container
WORKDIR /app

# Install dependencies based on the available lock file
COPY package.json ./
COPY yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN if [ -f yarn.lock ]; then \
        yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
        npm ci; \
    elif [ -f pnpm-lock.yaml ]; then \
        corepack enable pnpm && pnpm i --frozen-lockfile; \
    else \
        echo "Lockfile not found. Using npm install as fallback." && npm install; \
    fi

# Copy the rest of your application's source code
COPY . .

# Build the application
RUN npm run build

# Set environment to production
ENV NODE_ENV production

# Expose the port the app runs on
EXPOSE 3000

# Non-root user for security purposes
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs --ingroup nodejs
USER nextjs

# Start the application using Next.js's built-in server
CMD ["npm", "start"]
