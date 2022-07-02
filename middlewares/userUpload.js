const multer = require('multer');
const path = require('path');
const { TEMP_DIR } = require('../libs/constants');
const tempDir = path.join(__dirname, '..', TEMP_DIR);

const multerConfigStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now().toString()}_${file.originalname}`);
  },
});

const userUpload = multer({
  storage: multerConfigStorage,
  limits: {
    fileSize: 500000,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      return cb(null, true);
    }
    cb(new Error('Wrong format file for avatar!'));
  },
});

module.exports = userUpload;
