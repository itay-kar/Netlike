FROM node:20-alpine

WORKDIR /app

# Install production deps only — avoids nodemon and other dev tools in the image
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy only the backend source; frontend is irrelevant here
COPY backend/ ./backend/

EXPOSE 5000

CMD ["node", "backend/server.js"]
