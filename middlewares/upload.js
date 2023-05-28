const path = require('path');
const tempDir = path.join(__dirname, '../', 'tmp');
const multer = require('multer');
const multerConfig = multer.diskStorage({
  destination: tempDir,
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;