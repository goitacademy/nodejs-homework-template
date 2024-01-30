const multer = require("multer");
const path = require("node:path");

const tempDir = path.join(__dirname, "..", "tmp");

const multerConfig = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const storage = multer({ storage: multerConfig });

module.exports = { storage };
