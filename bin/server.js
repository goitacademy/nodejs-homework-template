const mongoose = require("mongoose");
//load env variables
require("dotenv").config(); //переменная окружения в .env

const app = require("../app");

const { DB_HOST, PORT = 3000 } = process.env;
// const {DB_USER, DB_USER_PASS, DB_NAME} = process.env;
// const DB_HOST = `mongodb+srv://${DB_USER}:${DB_USER_PASS}@cluster0.fbkoo.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true, //
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT)) //запускаем сервер только после подключения к базе
  .catch((error) => {
    console.log(error.message);
    process.exit(1); //закрывает все процесы на всякий случай
  });
