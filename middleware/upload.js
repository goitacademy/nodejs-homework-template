const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../../tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024,
  },
});

module.exports = upload;
