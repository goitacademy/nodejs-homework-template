const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../tmp"));
  },
  filename: (req, file, cb) => {
    const { user } = req;

    cb(null, user._id + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});
module.exports = upload;
