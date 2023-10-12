const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, "../", "tmp");

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, tempDir);
  },
  filename: (req, file, next) => {
    next(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;