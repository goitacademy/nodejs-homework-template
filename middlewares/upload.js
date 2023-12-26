const multer = require("multer");
const path = require("path");

// avatar load config
const tmpDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage(
  {
    destination: tmpDir,
    filename: function(req, file, callback) {
      callback(null, file.originalname);
  }
  }
);

const upload = multer(
  {
    storage: multerConfig,
  }
);

module.exports = upload;