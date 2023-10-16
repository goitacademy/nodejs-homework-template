const multer = require("multer");
const path = require("path");

const tmpFolder = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tmpFolder);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const limits = {
  fileSize: 1000000, // 1MB
};

const upload = multer({
  storage,
  limits,
});

module.exports = upload;
