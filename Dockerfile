FROM node:14.18.0-alpine

WORKDIR /server

COPY ./package.json .
RUN npm install

COPY . .

EXPOSE 8080

CMD npm start