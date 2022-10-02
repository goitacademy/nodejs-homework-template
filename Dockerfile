FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["node", "bin/server"]
