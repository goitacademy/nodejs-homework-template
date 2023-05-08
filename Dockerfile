FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "src/server"]

# docker run -d -p 4000:3000
# доступно буде на 4000 порті
# FROM node:16 - якщо потрібна версія ноди