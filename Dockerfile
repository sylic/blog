FROM node:22.5.1 as Builder
RUN mkdir -p /var/www/nuxt-app
WORKDIR /var/www/nuxt-app
COPY package*.json ./
RUN yarn install --registry=https://registry.npmmirror.com
COPY . .
RUN yarn build
FROM node:22.5.1
EXPOSE 3001
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3001
RUN mkdir -p /var/www/nuxt-app
WORKDIR /var/www/nuxt-app
COPY --from=Builder /var/www/nuxt-app/.output /var/www/nuxt-app
CMD [ "node", "./server/index.mjs" ]
