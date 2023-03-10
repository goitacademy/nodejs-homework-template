const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, { originalname }, callback) => {
    callback(null, originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
