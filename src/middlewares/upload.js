const multer = require("multer");
const path = require("path");
const UPLOAD_DIR = path.join(__dirname, "../../", process.env.UPLOAD_DIR);

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = { upload };
