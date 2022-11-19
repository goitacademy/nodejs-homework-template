const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../tmp"),
  filename: function (req, file, cb) {
    cb(null, nanoid() + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {},
});

module.exports = { upload };
