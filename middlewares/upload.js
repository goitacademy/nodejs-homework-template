const multer = require("multer");
const path = require("path");

const TEMP_DIR = "../temp";
const tempStoragePath = path.join(__dirname, TEMP_DIR).normalize();

const multerConfig = multer.diskStorage({
  destination: tempStoragePath,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
