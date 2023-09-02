const path = require("node:path");
const multer = require("multer");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "tmp"));
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const name = `${basename}-${crypto.randomUUID()}${extname}`;
    cb(null, name);
  },
});

module.exports = multer({ storage });
