const multer = require('multer');
const path = require('path');
const TEMP_DIR = path.join(process.cwd(), process.env.TEMP_DIR);
const AVATARS_DIR = path.join(process.cwd(), process.env.AVATARS_DIR);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 3000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
});
module.exports = { upload, TEMP_DIR, AVATARS_DIR };
