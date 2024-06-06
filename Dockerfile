# Base image
FROM node:18-alpine AS base

# Install system dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the available lock file
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN if [ -f yarn.lock ]; then \
        yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
        npm ci; \
    elif [ -f pnpm-lock.yaml ]; then \
        pnpm install --frozen-lockfile; \
    else \
        echo "Lockfile not found." && exit 1; \
    fi

# Rebuild the source code only when needed
FROM base AS builder
COPY . .
RUN if [ -f yarn.lock ]; then \
        yarn build; \
    elif [ -f package-lock.json ] || [ -f pnpm-lock.yaml ]; then \
        npm run build; \
    fi

# Production image, copy all the files and run next
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs --ingroup nodejs

WORKDIR /app
USER nextjs
EXPOSE 3000

# Copy necessary directories from the 'builder' stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./    # Ensure this includes the server.js
COPY --from=builder /app/.next/static ./static  # If static files are needed

# Start the application
CMD ["node", ".next/standalone/server.js"]
