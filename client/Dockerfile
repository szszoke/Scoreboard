FROM node:alpine as build-stage

WORKDIR /app
COPY client ./client
COPY common ./common

WORKDIR /app/client
RUN yarn
RUN yarn build --prod

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY client/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/client/dist/scoreboard-client /usr/share/nginx/scoreboard
