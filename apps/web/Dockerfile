# Docker file of node 16 with react and vite
## ===========================================================> The common stage
FROM node:18 AS base
ENV NODE_ENV=production

WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=web --docker

## ======================================================> The build image stage
FROM base AS build
ENV NODE_ENV=development

COPY . .

## This step could install only the missing dependencies (ie., development deps ones)
## but there's no way to do that with this NPM version
RUN yarn --frozen-lockfile --ignore-scripts
## Compile the TypeScript source code
RUN yarn turbo run build --filter=web...

FROM nginx AS release

RUN ls

COPY --from=build ./app/apps/web/dist /usr/share/nginx/html
COPY --from=build ./app/apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]