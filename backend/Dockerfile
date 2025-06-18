FROM oven/bun:latest
WORKDIR /app
COPY . .
RUN bun install
COPY . .
EXPOSE 3001
CMD ["bun", "run", "start_bun"]
