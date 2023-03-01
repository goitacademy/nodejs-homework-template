const path = require('path');
const multer = require('multer');
const tempDir = path.join(__dirname, '..', 'temp');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});
const upload = multer({
  storage,
});
module.exports = upload;
