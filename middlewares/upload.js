const multer = require("multer");
const path = require("path");

const pathToTemp = path.join(__dirname, "..", "temp");

const storage = multer.diskStorage({
  destination: pathToTemp,
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({
  storage,
});

module.exports = upload;
