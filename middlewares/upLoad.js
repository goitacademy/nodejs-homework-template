const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const upLoad = multer({ storage: multerConfig });

module.exports = upLoad;

// примит картинку в временную папку
// оставит оригинальное имя
// установит ограничение на размер
// в req.file внесет информацию про картинку
