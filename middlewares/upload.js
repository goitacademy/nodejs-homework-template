// const fs = require("fs").promises;
const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");

const multerConfig = multer.diskStorage({
  destination: path.join(__dirname, "../", "temp"),
  filename: (req, file, cb) => {
    cb(null, ` ${nanoid()}${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Invalid upload: fieltype should be .jpeg format "));
    }
  },
});

const upload = multer({
  storage: multerConfig,
});
module.exports = { upload };
