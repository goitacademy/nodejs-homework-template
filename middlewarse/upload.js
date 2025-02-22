const multer = require("multer");
const path = require("path");

const avatarsDir = path.join(__dirname, "../temp");
console.log(avatarsDir);
const multerConfig = multer.diskStorage({
  destination: avatarsDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
