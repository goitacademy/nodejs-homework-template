FROM node

WORKDIR /app

COPY . .

RUN npm instal

EXPOSE 3000

CMD ["node", 'bin/server']