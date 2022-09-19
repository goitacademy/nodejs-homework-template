const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./tmp"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadAvatarMiddleware = multer({ storage });

module.exports = {
  uploadAvatarMiddleware,
};
