const multer = require("multer");
const path = require("path");

const temDir = path.resolve("temp");
const multerConfig = multer.diskStorage({
  destination: temDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
