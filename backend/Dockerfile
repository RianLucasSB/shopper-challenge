FROM node:20-alpine3.18

WORKDIR /usr/app/src

COPY ./backend/package.json ./

RUN npm install

COPY ./backend .

COPY .env ../.env

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]