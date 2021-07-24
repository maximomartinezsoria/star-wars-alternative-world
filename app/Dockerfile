FROM node:14-alpine

WORKDIR /usr/src/app

COPY ./package.json ./

RUN yarn 

COPY . .

EXPOSE 3000
EXPOSE 5000

CMD ["yarn", "start"]
