const path = require("path");
const multer = require("multer");

const tempDir = path.join(__dirname, "../", "./temp");

console.log(tempDir);

const multerConfing = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfing,
});

module.exports = upload;
