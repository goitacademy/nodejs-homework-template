const multer = require("multer");
const path = require("path");

const tempDir = path.resolve("temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "_" + uniquePrefix + ".jpg");
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;