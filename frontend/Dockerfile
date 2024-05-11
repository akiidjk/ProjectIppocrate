# Fase di build
FROM oven/bun:1.1.3 as base

WORKDIR /frontend

COPY . .

RUN bun install

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start", "--", "-H", "0.0.0.0"]