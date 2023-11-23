const multer = require("multer");
const path = require("node:path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, path.join(__dirname, "..", "tmp"));
  },
});

const upload = multer({ storage });

module.exports = upload;
