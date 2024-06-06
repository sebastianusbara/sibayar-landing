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
        yarn global add pnpm && pnpm i --frozen-lockfile; \
    else \
        echo "Lockfile not found." && exit 1; \
    fi

# Rebuild the source code only when needed
FROM base AS builder
# Here we copy the node_modules from the previous stage, which was named 'base'
COPY --from=base /app/node_modules ./node_modules
COPY . .

RUN if [ -f yarn.lock ]; then \
        yarn build; \
    elif [ -f package-lock.json ] || [ -f pnpm-lock.yaml ]; then \
        npm run build; \
    fi

# Production image, copy all the files and run next
FROM base AS runner
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs --ingroup nodejs

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

WORKDIR /app
USER nextjs
EXPOSE 3000

# Copy necessary directories from the 'builder' stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Ensure to specify the correct path for the Next.js server script
CMD ["node", ".next/standalone/server.js"]
