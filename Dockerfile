FROM node:16.20

WORKDIR /app

COPY . . 

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
# CMD ["node", "server"]