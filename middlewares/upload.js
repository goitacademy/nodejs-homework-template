const path = require("path");
const multer = require("multer");
const Jimp = require("jimp");

const multerConfig = multer.diskStorage({
  destination: path.join(__dirname, "../", "temp"),
  filename: (req, file, cb) => {
    Jimp.read(file.originalname)
      .then((file) => {
        file.resize(250, 250); // resize
      })
      .catch((err) => err);

    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
