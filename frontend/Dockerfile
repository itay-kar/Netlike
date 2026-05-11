# ── Stage 1: build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build
# Output lands in /app/dist

# ── Stage 2: serve ──────────────────────────────────────────────────────────
FROM nginx:alpine

# Drop the compiled React app into nginx's serve directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Our custom nginx config (SPA routing + /api proxy)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
