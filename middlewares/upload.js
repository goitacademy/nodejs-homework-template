const multer = require('multer');

const path = require('path');
const destination = path.resolve('temp');

const HttpError = require('../helpers/HttpError');

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${uniquePrefix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024,
};

const mineTypeWhitelist = ['image/jpeg', 'image/png'];

const fileFilter = (req, file, cb) => {
  if (mineTypeWhitelist.includes(file.mimetype)) {
    return cb(HttpError(400, 'Invalid file format'));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

module.exports = upload;
