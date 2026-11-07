# Multi-stage: собираем в полном образе, в рантайм едет только .output.
# База bookworm (glibc) обязательна: better-sqlite3 из @nuxt/content
# не работает на alpine/musl.
FROM node:22-bookworm-slim AS build
WORKDIR /app
# git нужен npm ci для git-зависимости (@wiopriph/eslint-config);
# lock хранит ее как git+ssh - перенаправляем на https, ключей в образе нет
RUN apt-get update \
  && apt-get install -y --no-install-recommends git ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && git config --global url."https://github.com/".insteadOf ssh://git@github.com/
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
