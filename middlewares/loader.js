const multer = require("multer");
const path = require("path");

const tempPath = path.join(__dirname, "../tmp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const loader = multer({
  storage: multerConfig,
});

module.exports = loader;
