const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const { _id } = req.user;

    const extname = path.extname(file.originalname);
    const filename = `${_id}${extname}`;

    cb(null, filename);
  },
});

const uploadAvatar = multer({
  storage: multerConfig,
});

module.exports = uploadAvatar;
