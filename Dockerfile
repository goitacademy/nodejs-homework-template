FROM node:14.16.1-alpine

WORKDIR /server

COPY ./package.json .
RUN npm install

COPY . .

EXPOSE 3001

CMD npm start
