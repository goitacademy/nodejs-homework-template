const path = require("node:path");
const crypto = require("node:crypto");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    
    cb(null, path.join(__dirname, "..", "tmp"));
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname); // .jpg
    const basename = path.basename(file.originalname, extname); // kitten
    const suffix = crypto.randomUUID();

    cb(null, `${basename}-${suffix}${extname}`);
  },
});

module.exports = multer({ storage });