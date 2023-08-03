FROM node:18.12.1

WORKDIR /app

COPY . . 

RUN npm i

EXPOSE 3000

CMD [ "node", "server" ]