const multer = require("multer");
const path = require("path");
const { HttpCode } = require("./constants");

require("dotenv").config();

const PUBLIC_DIR = path.join(process.cwd(), process.env.PUBLIC_DIR);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PUBLIC_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,

  limits: { fileSize: 2000000 },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }
    const error = new Error("Wrong format file for avatar");
    error.status = HttpCode.BAD_REQUEST;
    cb(error);
  },
});

module.exports = { upload };
