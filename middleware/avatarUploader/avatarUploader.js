const path = require("path");
const multer = require("multer");
const tempDir = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const avatarUploader = multer({
  storage: storage,
});

module.exports = avatarUploader;
