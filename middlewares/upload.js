const multer = require("multer");

const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.substring(0, "image".length) === "image") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const upload = multer({ storage: multerConfig });

module.exports = upload;
