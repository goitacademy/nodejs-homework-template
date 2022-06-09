const multer = require("multer");
const path = require("path");

const dirPath = path.join(__dirname, "../", "tmp");

const storage = multer.diskStorage({
  destination: dirPath,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
