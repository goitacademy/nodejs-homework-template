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
    const suffix = crypto.randomUUID();
    const newFilename = `${basename}-${suffix}${extname}`;

    cb(null, newFilename);
  },
});

const upload = multer({ storage });
module.exports = upload;
