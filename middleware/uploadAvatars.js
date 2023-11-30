const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// размещаем файл на диске
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "tmp")); // сохраняем аватарки в папке tmp
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname); // получаем расширешие файла
    const basename = path.basename(file.originalname, extname); // получаем базовое название файла
    const sufix = crypto.randomUUID(); // создаём уникальное id
    cb(null, `${basename}-${sufix}${extname}`); // создаём уникальное название файла
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // установили лимит для загрузки файла
});

module.exports = upload;
