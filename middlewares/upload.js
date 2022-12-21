const multer = require("multer");
const path = require("path");

const tempDir = path.resolve("./", "temp");

console.log(tempDir, "tempDir");
const storage = multer.diskStorage({
  destination: tempDir,
  fileName: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
