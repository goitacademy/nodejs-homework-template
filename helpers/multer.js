const multer = require("multer");
const path = require("path");
require("dotenv").config();

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
// const IMG_DIR = path.join(__dirname, 'public', 'images');

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
  limits: { fieldSize: 10000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }

    cb(null, false);
  },
});

module.exports = { upload };
