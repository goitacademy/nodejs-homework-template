const multer = require("multer");
const path = require("path");

const tmpPath = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tmpPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
