const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

function checkFileType(file, cb) {
  const ext = path.extname(file.originalname);
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  if (!allowedFileTypes.test(ext)) return cb(null, false);
  cb(null, true);
}

const upload = multer({
  storage: multerConfig,
  limits: { fileSize: 9e6 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

module.exports = upload;
