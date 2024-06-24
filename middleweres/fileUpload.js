const multer = require('multer');
require('dotenv').config();
const tmp = process.env.TEMP_FOLDER;

const multerConfig = multer.diskStorage({
  desination: (req, file, cb) => {
    cb(null, tmp);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileUpload = multer({ storage: multerConfig });

module.exports = { fileUpload };