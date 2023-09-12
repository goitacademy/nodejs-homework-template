const multer = require("multer");
const path = require("node:path");
const crypto = require("node:crypto");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "tmp"));
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const sufix = crypto.randomUUID();

    cb(null, `${basename}-${sufix}${extname}`);
  },
});

module.exports = multer({ storage });
