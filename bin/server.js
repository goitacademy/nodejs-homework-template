const app = require("../app");

const db = require("../model/db"); // подключаем db из файла model/db.js

const createFolderIsNotExist = require("../helpers/create-folder"); // создание папки для аватарок при запуске сервера, если она не существует

require("dotenv").config();

// Переменные окружения
const PORT = process.env.PORT || 3000;
// создание папки для аватарок при запуске сервера, если она не существует
const UPLOAD_DIR = process.env.UPLOAD_DIR;
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;

// чтобы при старте сервера создавалась и загружалась папка для аватарок
db.then(() => {
  app.listen(PORT, async () => {
    // создание папки для аватарок при запуске сервера, если их не существует
    await createFolderIsNotExist(UPLOAD_DIR);
    await createFolderIsNotExist(AVATAR_OF_USERS);

    console.log(`Server running. Use our API on port: ${PORT}`);
  }); // сервер запускаем только после того как подключили базу данных
}).catch((e) => {
  console.log(`Error: ${e.message}`);
});
