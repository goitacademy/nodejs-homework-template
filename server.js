
// импортируем mongoose.
const mongoose = require("mongoose")
// если .env в основной папке то пишем require('dotenv').config()
require('dotenv').config({ path: './environments/.env' });
const app = require('./app')

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true)

// запуск сервера после успешно подсоединения к dataBase
mongoose.connect(DB_HOST).then(() => {
  console.log("Database connection successful");
  app.listen(PORT)
 
})
.catch(error => {
  console.log("Database connection error:", error.message);
  // останавливает запущенный процесс в случае ошибки
  process.exit(1)
} )


