FROM node:18-alpine

WORKDIR /home

COPY ./package*.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "run", "dev"]

