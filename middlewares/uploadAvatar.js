const multer = require('multer');

const storage = multer.memoryStorage(); // Загружаем файл в память, а не на диск

const uploadAvatar = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024, // Максимальный размер файла (1 MB)
  },
  fileFilter: (req, file, cb) => {
    // Проверка типа файла (картинка)
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'), false);
    }
  },
});

module.exports = uploadAvatar;
