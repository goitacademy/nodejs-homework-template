const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const tmpDir = path.join(__dirname, "../tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${ext}`;
    cb(null, uniqueName);
  },
});

const uploadAvatar = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
}).single("avatar");

module.exports = uploadAvatar;
