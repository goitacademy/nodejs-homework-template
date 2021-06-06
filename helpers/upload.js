const multer = require("multer");

const UPLOAD_DIR = process.env.UPLOAD_DIR;
require("dotenv").config();

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
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes("image")) {
      cb(null, false);
      return;
    }
    console.log("medl", file);
    cb(null, true);
    // cb(new Error("Upload Error"));
  },
});

module.exports = upload;
