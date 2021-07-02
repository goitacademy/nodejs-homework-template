const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const TMP_DIR = path.resolve('./tmp');

const upload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TMP_DIR);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.');
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const avatarUploadMiddleware = multer({ storage: upload });

module.exports = { avatarUploadMiddleware };
