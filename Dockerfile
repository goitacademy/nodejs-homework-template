FROM node:79

RUN mkdir -p /app
WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm install 
COPY . .

EXPOSE 3000

CMD [ "node", "server.js", "npm" ]