const path = require('path');
const tmpDir = path.join(__dirname, '../', 'tmp');
const multer = require('multer');
const multerConfig = multer.diskStorage({
  destination: tmpDir,
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;