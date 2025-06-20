# Stage 1: Base image
FROM oven/bun:alpine AS base

# Stage 2: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Stage 3: Build the Next.js application
FROM base AS builder
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Stage 4: Run the production application
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./
EXPOSE 3000
CMD ["bun", "run", "start"]
