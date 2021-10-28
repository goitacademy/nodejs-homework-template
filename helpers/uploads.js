const multer = require("multer");
const { CustomError } = require("./customError");
require("dotenv").config();
const UPLOAD_DIR = process.env.UPLOAD_DIR;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 2000000 },
  fileFilter: (req, file, cd) => {
    if (file.mimetype.includes("image")) {
      return cd(null, true);
    }
    cd(new CustomError(400, "Wrong format for avatar"));
  },
});

module.exports = upload;
