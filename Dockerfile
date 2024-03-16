FROM node:18 as base

WORKDIR /src

COPY package*.json ./

COPY prisma ./prisma/

RUN npm i

COPY . .

# RUN npm run db-migrate

FROM base as production

ENV NODE_PATH=./dist

RUN npm run build
