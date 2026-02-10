# Build React App
FROM node:18 AS build

WORKDIR /app

# Build-Argument für React
ENV REACT_APP_HOST_IP="126.0.82.200"

COPY package*.json ./

RUN npm install

COPY . .

# Build mit eingebetteter ENV
RUN npm run build

# Serve with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80