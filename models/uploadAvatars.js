const multer = require("multer");

// размещаем файл на диске
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/avatars");
  },
  filename: function (req, file, cb) {},
});

const upload = multer({ storage: storage });

module.exports = { upload };
