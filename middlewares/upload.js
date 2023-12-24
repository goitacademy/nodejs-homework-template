const multer = require("multer");
const path = require("path");

// avatar load config
const tmpDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage(
  {
    destination: tmpDir,
  }
);

const upload = multer(
  {
    storage: multerConfig,
  }
);

module.exports = upload;