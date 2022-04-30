const app = require('./app')

// localhost - локальный домен
// для прослушивания соединения от клиента задействуем порт 3000 
// запуск npm run start:dev

// инициализируем сервер прослушиваем на порту 3000
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
