FROM node

WORKDIR /server

COPY . .

RUN npm install

EXPOSE 8080

CMD ["node", "server"]