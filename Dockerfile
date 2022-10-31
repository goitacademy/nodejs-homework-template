FROM node:16.15

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "server"]