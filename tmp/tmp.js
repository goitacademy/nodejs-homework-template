const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '../tmp');
const avatarsDir = path.join(__dirname, '../public/avatars');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
