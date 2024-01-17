const path = require("path");
const multer = require("multer");
const tempFolder = path.join(__dirname, "../temp");

const multerStorage = multer.diskStorage({
  destination: tempFolder,
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const avatarMiddleware = multer({
  storage: multerStorage,
});
module.exports = avatarMiddleware;
