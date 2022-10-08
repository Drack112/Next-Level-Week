FROM node:16-alpine AS development

ENV NODE_ENV development

RUN apk add --no-cache bash

WORKDIR /home/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000

FROM node:16-alpine AS builder

ENV NODE_ENV production

WORKDIR /home/app

COPY package.json .
COPY yarn.lock .
RUN yarn install --production

COPY . .

RUN yarn build


FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
