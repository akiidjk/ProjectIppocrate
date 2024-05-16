# Use a base image with Bun installed
FROM oven/bun AS base

# Stage to install dependencies
FROM base AS deps
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN bun install --frozen-lockfile

# Stage to build the application
FROM base AS builder
WORKDIR /app

# Copy dependencies from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application files
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED 1

# Build the application
RUN bun run build

# Production image
FROM base AS runner
WORKDIR /app

# Set the environment to production
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a system user to run the application
RUN adduser --system --uid 1001 nextjs

# Copy necessary files and directories from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Ensure the .next/cache directory exists and has the correct permissions
RUN mkdir -p /app/.next/cache/images
RUN chown -R nextjs:bun /app/.next /app/node_modules

# Switch to the non-root user
USER nextjs

# Command to run the application
CMD ["bun", "start", "--", "-H", "0.0.0.0","-p $PORT"]
