//викликаємо mongoose
const mongoose = require("mongoose");
const app = require('./app')


const { DB_HOST, PORT = 3000 } = process.env;
// прописуємо true для наступної версії
mongoose.set("strictQuery", true);

// щоб підключитися до бази викликаємо метод (conect)
mongoose.connect(DB_HOST).then(() => {
  // підключаємось до сервера
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
  console.log("Database connect success");
})
.catch((error) => {
  console.log(error.message);
  // це команда яка закриває запущені процеси
  // (1)- це закриття з невідомою помилкою
  process.exit(1);
});



