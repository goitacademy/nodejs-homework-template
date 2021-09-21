const multer = require("multer");

require("dotenv").config();
const TMP_DIR = process.env.TMP_DIR;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TMP_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}-${file.originalname}`);
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
    error.status = 400;
    cb(error);
  },
});

module.exports = upload;
