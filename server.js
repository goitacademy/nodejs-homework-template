/// 25/06/2023
const mongoose = require("mongoose");
const DB_HOST = "mongodb+srv://Den123:uxqHufnBCdZ8h1vN@cluster0.dp5onfe.mongodb.net/db-contacts?retryWrites=true&w=majority";
// mongoose.connect(DB_HOST)  - возвращает промис
mongoose.connect(DB_HOST).then(()=>{
  app.listen( () => {
    // console.log("Server running. Use our API on port: 3000");
    console.log("Database connection successful");
    // console.log(process.env);
  })
}).catch(error => {
console.log(error.message);
process.exit(1);
})
// при успешном подключении запускается веб-сервер  app.listen
// при ошибки выводим в консоль error.message и метод process.exit(1) закрывает ВСЕ фоновые процессы (которые были запущены до подключения к базе данных)








// mongodb+srv://Den123:uxqHufnBCdZ8h1vN@cluster0.dp5onfe.mongodb.net/

// uxqHufnBCdZ8h1vN

const app = require('./app')


// app.listen( () => {
//   console.log("Server running. Use our API on port: 3000")
// })
