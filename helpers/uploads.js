const multer = require('multer');
require('dotenv').config();
const { CustomError } = require('./customError');
const { Limits } = require('../config/constants');

const TMP = process.env.TMP_AVATAR;

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, TMP);
  },
  filename: function (_req, file, cb) {
    cb(null, `${Date.now().toString()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: Limits.LIMITS_FIELD_SIZE },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      return cb(null, true);
    }

    cb(new CustomError(400, 'Wrong format for avatar'));
  },
});

module.exports = upload;
