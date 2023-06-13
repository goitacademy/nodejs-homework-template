const multer = require("multer");
const path = require("path");

const directory = path.join(__dirname, "..", "temp");

const config = multer.diskStorage({
  destination: directory,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: config,
});

module.exports = { upload };
