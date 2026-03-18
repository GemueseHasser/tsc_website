# --- build stage ---
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY public ./public
COPY scripts ./scripts
COPY src ./src

ARG REACT_APP_HOST_IP=126.0.82.200
ENV REACT_APP_HOST_IP=$REACT_APP_HOST_IP

RUN npm run build

# --- runtime stage ---
FROM php:8.2-apache

WORKDIR /var/www/html

# Apache Rewrite aktivieren für React-Routing
RUN a2enmod rewrite

# Build-Dateien ins Webroot
COPY --from=build /app/build/ /var/www/html/

# Falls du eine .htaccess nutzt, wird sie mitkopiert,
# sofern sie im build/public enthalten ist.

EXPOSE 80