FROM node:14 as BUILD
WORKDIR /app
COPY . /app
RUN yarn install
RUN yarn run build
EXPOSE 8080
EXPOSE 6379
CMD ["yarn", "start"]