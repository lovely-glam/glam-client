FROM node:18 AS build
WORKDIR /build
COPY . .
RUN npm ci && npm run build

FROM node:18 AS prod
WORKDIR /app
COPY --from=build /build/.next ./.next
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/package.json /build/package-lock.json ./
ENTRYPOINT [ "npm", "start" ]