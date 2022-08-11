FROM node

WORKDIR /app

COPY . .

EXPOSE 5000

CMD ["node", "app"]