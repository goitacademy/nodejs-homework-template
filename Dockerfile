FROM node:14-alpine
WORKDIR /nodejs-homework-template
COPY . .
RUN npm install
CMD ["node", "/nodejs-homework-template/app.js"]