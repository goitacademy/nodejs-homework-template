const multer = require('multer');

const CustomError = require('./customError');
const HttpCode = require('../config/constants');

require('dotenv').config();
const UPLOAD_DIR = process.env.UPLOAD_DIR;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      return cb(null, true);
    }

    cb(new CustomError(HttpCode.BAD_REQUEST, 'Wrong format for avatar file'));
  },
});

module.exports = upload;
