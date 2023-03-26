const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, "../", "tmp");

//* Мидлвар для загрузки файлов
const multerConfig = multer.diskStorage({
  destination: tmpDir, // * Путь к папке в которой временно будут храниться файлы
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
