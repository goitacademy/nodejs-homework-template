const path = require("path");
const multer = require("multer");

const multerConfig = multer.diskStorage({
  destination: path.join(__dirname, "../", "temp"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
