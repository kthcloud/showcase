# stage 1 - build react app first
FROM docker.io/oven/bun:latest as build
WORKDIR /app

COPY ./package.json /app/
COPY . /app

ENV NODE_ENV="production"

RUN bun install
RUN bun run build

# stage 2 - serve the static files
FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]