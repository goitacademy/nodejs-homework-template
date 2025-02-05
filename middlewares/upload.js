const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");
const avatarSize = 2097152;

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: avatarSize,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
