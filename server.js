// імпортуємо сюди сервер з app.js
const app = require('./app')


// щоб запустити сервер, необхідно викликати метод listen та вказати порт (будь-яке число);
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
