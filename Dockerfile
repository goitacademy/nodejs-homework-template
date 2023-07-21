FROM node:18.14.0

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node", "app.js" ]