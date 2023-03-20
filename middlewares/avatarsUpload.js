const multer = require('multer');
const path = require('path');

const uploadDir = path.join(process.cwd(), 'tmp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const avatarUpload = multer({
  storage,
});

module.exports = { avatarUpload };
