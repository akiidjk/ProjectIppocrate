FROM oven/bun AS base

FROM base AS deps
WORKDIR /app

COPY package.json ./
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN bun run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

RUN mkdir -p /app/.next/cache/images
RUN chown -R nextjs:bun /app/.next /app/node_modules

USER nextjs

CMD ["bun", "start", "--", "-H", "0.0.0.0","-p $PORT"]
