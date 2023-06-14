FROM node

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app"]