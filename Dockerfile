FROM node:19.5-alpine

WORKDIR /server

COPY ./package.json .
COPY ./tsconfig.json .

RUN npm install
COPY . . 

EXPOSE 3000

CMD npm run start:prod
