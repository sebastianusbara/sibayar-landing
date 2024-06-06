# Use a single stage build to keep things simple
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache libc6-compat

# Copy package.json and associated lock file(s)
COPY package.json ./
COPY yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies based on the available lock file
RUN if [ -f yarn.lock ]; then \
        yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
        npm ci; \
    elif [ -f pnpm-lock.yaml ]; then \
        corepack enable pnpm && pnpm install --frozen-lockfile; \
    else \
        echo "Lockfile not found." && exit 1; \
    fi

# Copy the rest of your application's source code
COPY . .

# Build the application
RUN npm run build

# Set environment to production
ENV NODE_ENV production

# Expose the port the app runs on
EXPOSE 3000

# Set the user to use a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs --ingroup nodejs
USER nextjs

# Start the application using Next.js's built-in server
CMD ["npm", "start"]
