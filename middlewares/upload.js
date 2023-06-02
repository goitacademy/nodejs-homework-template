const multer = require("multer");
const path = require("path");
const { HttpError } = require("../helpers");

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const { mimetype } = file;

  if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
    cb(HttpError(400, "File can have only jpeg or png extension"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: multerConfig, fileFilter });

module.exports = upload;
