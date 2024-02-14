FROM node:18 as base

WORKDIR /src

COPY package*.json ./

COPY prisma ./prisma/

RUN npm i

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build
