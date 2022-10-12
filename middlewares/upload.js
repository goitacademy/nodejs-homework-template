const multer = require('multer');
const path = require('path');
/**
 * path to img
 */
const tempDir = path.join(__dirname, '..', 'tmp');

/** config multer  */
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
/** */
const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
