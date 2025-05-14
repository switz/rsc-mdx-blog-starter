FROM node:22-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY . .

ENV CI=true

RUN pnpm install --frozen-lockfile && pnpm build && pnpm install --frozen-lockfile --prod

ENV NODE_ENV=production

EXPOSE 3000

CMD ["pnpm", "start:prod"]
