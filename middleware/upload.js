const path = require("node:path");
const crypto = require("crypto");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "tmp"));
  },
  filename: (req, file, cb) => {
    console.log(file);
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const suffix = crypto.randomUUID();
    cb(null, `${basename}-${suffix}${extname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
