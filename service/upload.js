const multer = require('multer');
const path = require('path');
require('dotenv').config();
const TMP_DIR = path.join(process.cwd(), process.env.TMP_DIR);

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, TMP_DIR);
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.includes('avatars')) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
});

module.exports = upload;