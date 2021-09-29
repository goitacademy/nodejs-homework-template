const mongoose = require("mongoose");
require("dotenv").config(); //переменная окружения появится в .env

const app = require("../app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT)) //запускаем сервер только после подключения к базе
  .catch((error) => {
    console.log(error.message);
    process.exit(1); //закрывает все процесы на всякий случай
  });
