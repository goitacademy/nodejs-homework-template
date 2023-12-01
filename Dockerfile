FROM node:20-alpine

# Установка зависимостей
RUN apk add --no-cache python3 g++ make

# Установка рабочей директории в /app
WORKDIR /app

# Копирование всех файлов в текущую директорию внутри контейнера
COPY . .

# Установка зависимостей приложения
RUN yarn install --production

# Команда для запуска приложения
CMD ["node", "/app/app.js"]