const path = require("path");
const multer = require("multer");

const avatarDir = path.join(process.cwd(), "public", "avatars");
const tmpDir = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    const id = req.user._id.toString();
    const name = [id, file.originalname].join("_");
    cb(null, name);
  },
  limits: { fileSize: 1048576 },
});

const upload = multer({
  storage: storage,
});

module.exports = { upload, avatarDir, tmpDir };
