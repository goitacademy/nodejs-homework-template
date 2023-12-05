const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    if (!req.user || !req.user._id) {
      return cb(new Error("Not authorized or user ID not available"));
    }

    const extname = path.extname(file.originalname);
    const filename = `${req.user._id}${extname}`;

    cb(null, filename);
  },
});

const uploadAvatar = multer({
  storage: multerConfig,
});

module.exports = uploadAvatar;
