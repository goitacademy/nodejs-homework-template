const multer = require('multer');
const path = require('path');

const tmpDir = path.join(__dirname, '../', 'tmp');

const storage = multer.diskStorage({
  destination: tmpDir,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports = multer({ storage: storage });
