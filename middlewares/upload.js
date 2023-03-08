const path = require("path");
const multer = require("multer");

const uploadDir = path.join(__dirname, "../", "tmp");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({
  storage: multerStorage,
});

module.exports = upload;
