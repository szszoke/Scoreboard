FROM node:alpine as build-stage

WORKDIR /app
COPY api ./api
COPY common ./common

WORKDIR /app/api
RUN yarn
RUN yarn build

WORKDIR /app/api/bin/api
COPY api/tsconfig.json ./
