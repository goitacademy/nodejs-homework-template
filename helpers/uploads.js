const multer = require("multer");
require("dotenv").config();
const { CustomError } = require("./customError");
const { StatusCode, LimitSize } = require("../config/constants");
const UPLOAD_DIR = process.env.UPLOAD_DIR;

const BAD_REQUEST = StatusCode.BAD_REQUEST;
const FIELD_SIZE = LimitSize.FIELD_SIZE;

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (_req, file, cb) {
    cb(null, `${Date.now().toString()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: FIELD_SIZE },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.includes("image")) {
      return cb(null, true);
    }

    cb(new CustomError(BAD_REQUEST, "A wrong format for avatar!"));
  },
});

module.exports = upload;