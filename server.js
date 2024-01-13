const app = require("./app"); // Подключение файла app.js с настройками Express
const mongoose = require("mongoose"); // Подключение Mongoose для работы с MongoDB

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST) // Подключение к MongoDB
  .then(() => {
    app.listen(PORT, () => {
      //!Запускаем веб-сервер.
      console.log("Server running. Use our API on port: 3000");
    });
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err.message); // Вывод сообщения об ошибке подключения к базе данных
    process.exit(1);
  });
