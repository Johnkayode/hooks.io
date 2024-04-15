FROM node:18 as base

WORKDIR /src/api

COPY package*.json ./

COPY prisma ./prisma/

RUN npm i

COPY . .

FROM base as production

ENV NODE_PATH=./dist

RUN npm run build
