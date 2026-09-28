# Multi-stage: собираем в полном образе, в рантайм едет только .output.
# База bookworm (glibc) обязательна: better-sqlite3 из @nuxt/content
# не работает на alpine/musl.
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
