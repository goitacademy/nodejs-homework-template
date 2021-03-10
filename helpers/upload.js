const multer = require('multer');
const path = require('path');
require('dotenv').config();

// мидлвар отвечающий за загрузку файлов во временную папку tmp
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    // только если в типе файла есть image - мы ее загрузим
    if (file.mimetype.includes('image')) {
      cb(null, true);
      return;
    }

    cb(null, false);
  },
});

module.exports = upload;
