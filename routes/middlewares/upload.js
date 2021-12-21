const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../../", "tmp");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "file/psd": "psd", // i got a problem with this MIME TYPE
};
const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Only pictures are supported! Wrong type of file");
    if (isValid) {
      error = null;
    }
    cb(error, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = { upload };
