const path = require("path");

const multer = require("multer");

const tmpDir = path.join(process.cwd(), "tmp");

const allowedExtensionList = [".jpg", ".jpeg", ".png", ".gif"];
const allowedMimetypeList = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    if (
      !allowedExtensionList.includes(extension) ||
      !allowedMimetypeList.includes(mimetype)
    ) {
      return cb(null, false);
    }
    return cb(null, true);
  },
});

module.exports = upload;
