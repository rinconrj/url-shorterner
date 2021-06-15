FROM node:14 as BUILD
WORKDIR /app
COPY . /app
RUN yarn install
RUN yarn run build
CMD ["yarn", "start"]
