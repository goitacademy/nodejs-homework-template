FROM node:15

WORKDIR /app

COPY package.json .

RUN npm install

EXPOSE 3300

CMD ["npm", "start"]