const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
  destination: tempDir,
});
const upload = multer({
  storage: multerConfig,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

module.exports = upload;
