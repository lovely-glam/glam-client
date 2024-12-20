FROM node:18 AS build
WORKDIR /build
COPY . .
ARG AUTH_HOST
ARG BUSINESS_HOST
ARG SYSTEM_HOST
ARG USER_HOST
ARG WEBSOCKET_HOST
ARG WORKER_HOST

ENV NEXT_PUBLIC_AUTH_HOST=$AUTH_HOST
ENV NEXT_PUBLIC_BUSINESS_HOST=${BUSINESS_HOST}
ENV NEXT_PUBLIC_SYSTEM_HOST=${SYSTEM_HOST}
ENV NEXT_PUBLIC_USER_HOST=${USER_HOST}
ENV NEXT_PUBLIC_WEBSOCKET_HOST=${WEBSOCKET_HOST}
ENV NEXT_PUBLIC_WORKER_HOST=${WORKER_HOST}

RUN npm ci && npm run build

FROM node:18 AS prod
WORKDIR /app
COPY --from=build /build/.next ./.next
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/package.json /build/package-lock.json ./
COPY --from=build /build/next.config.mjs/ ./
COPY --from=build /build/public ./public
ENTRYPOINT [ "npm", "start" ]