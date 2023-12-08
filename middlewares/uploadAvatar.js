const multer = require("multer");
// const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp"); // Зберігаємо файл у папці tmp
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueFileName); // Унікальне ім'я файлу
  },
});

const uploadAvatar = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024, // Максимальний розмір файлу (1 MB)
  },
  fileFilter: (req, file, cb) => {
    // Перевірка типу файлу (зображення)
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."), false);
    }
  },
});

module.exports = uploadAvatar;
