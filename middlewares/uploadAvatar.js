const multer = require("multer");

const path = require("path");

const tempDir = path.join(process.cwd(), "./", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadUserAvatar = multer({
  storage: multerConfig,
});

module.exports = uploadUserAvatar;
