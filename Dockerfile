FROM node:18-alpine AS build
WORKDIR /glam-build
COPY . .
RUN yarn && yarn build

FROM nginx:1.21.0-alpine
COPY --from=build /glam-build/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /glam-build/dist .
CMD ["nginx", "-g", "daemon off;"]