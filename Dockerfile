# --- build stage ---
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY public ./public
COPY src ./src

ARG REACT_APP_HOST_IP=126.0.82.200
ENV REACT_APP_HOST_IP=$REACT_APP_HOST_IP

RUN npm run build

# --- runtime stage ---
FROM nginx:1.27-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN printf 'server {\n  listen 80;\n  server_name _;\n  root /usr/share/nginx/html;\n  index index.html;\n  location / {\n    try_files $uri $uri/ /index.html;\n  }\n}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80