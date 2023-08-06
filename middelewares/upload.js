const multer = require("multer");

const path = require("path");

const tempDer = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDer,
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;