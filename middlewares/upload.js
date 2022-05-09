const multer = require("multer");
// const fs = require("fs/promises");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");
// const avatarsDir = path.join(__dirname. "public", "avatars")

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({
  storage: multerConfig,
})

module.exports = upload;
