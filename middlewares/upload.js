const multer = require("multer");
const { resolve } = require("path");

const destination = resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({});
