const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '../', 'temp');

const storage = multer.diskStorage({
  destination: tempDir,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
