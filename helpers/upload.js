// upload - для аватарки пользователя
// const path = require("path");

const multer = require("multer");

require("dotenv").config();

// Переменные окружения
// const PORT = process.env.PORT || 3000;

// создание папки для аватарок при запуске сервера, если она не существует
const UPLOAD_DIR = process.env.UPLOAD_DIR;

// когда multer получает иноформацию file, он его распрарсивает и предоставляет информацию о файле, которую можно посмотреть также и в документации

// Движок дискового пространства. Дает полный контроль над размещением файлов на диск.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()} - ${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    // когда файл приходит, если есть "image", вызывается callback, что ошибки не было, и return, чтобы дальше выполнение не произошло
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }
    //   если мы хотим отдать правильный ответ - создаем ошибку
    const error = new Error("Wrong format file for avatar");
    error.status = 400;
    cb(error); // вызываем callback с этой ошибкой
  },
}); // всегда устанавливаем limit, и не разрешаем превышать размер указаного файла, в даном примере 2МБ; fileFilter - это функция, которая согласно документации принимает  параметры, и которая отклоняет, принимает файл или выдает ошибку:

module.exports = upload;
