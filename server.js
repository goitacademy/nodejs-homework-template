const app = require('./app')

// localhost - локальный домен
// для прослушивания соединения от клиента задействуем порт 3000 
//! запуск npm run start:dev
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
