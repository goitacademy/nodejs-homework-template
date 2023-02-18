FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3001

CMD [ "node","server"]

