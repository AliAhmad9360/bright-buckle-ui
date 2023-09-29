# FROM node:16.17.0 as angular
FROM node:19.5.0-alpine
WORKDIR /app

COPY . .
# RUN npm install
RUN npm run build

FROM httpd:alpine3.15
WORKDIR /usr/local/apache2/htdocs
COPY --from=angular /app/dist/tailwind-demo .