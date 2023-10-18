FROM node:18.17.1

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["node", "bin/server"]