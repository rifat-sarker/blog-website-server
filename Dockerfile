# 2026 Production Multi-stage Node.js Server Dockerfile
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS dependencies
COPY package.json ./
RUN npm install --omit=dev

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=5000

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

EXPOSE 5000
CMD ["node", "src/server.js"]

