const app = require('./app')
const dotenv = require('dotenv')
dotenv.config()

// localhost - локальный домен
// для прослушивания соединения от клиента задействуем порт 3000 
// запуск npm run start:dev

// инициализируем сервер прослушиваем на порту 3000
const { PORT } = process.env

app.listen(PORT, () => {
  console.log('Server running. Use our API on port', PORT)
})
