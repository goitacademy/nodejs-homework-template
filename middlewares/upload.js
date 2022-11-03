const path = require("path");
const multer = require("multer");

const tempDir = path.join(__dirname, "../", "./temp");

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
