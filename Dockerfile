# Build frontend 
FROM node:22-alpine AS build

WORKDIR /frontend

COPY frontend/package*.json ./

RUN npm ci

COPY frontend/ .

RUN npm run build

# Final build stage of the backend
FROM node:18-alpine


FROM node:22-alpine

WORKDIR /app

COPY backend/package*.json ./

RUN npm ci --omit=dev

COPY backend/ .

COPY --from=build /frontend/dist ./public

EXPOSE 8888

CMD ["npm", "start"]
