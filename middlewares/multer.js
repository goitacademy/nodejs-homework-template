const multer = require('multer');
const { uploadTemp } = require('../path');

const multerConfig = multer.diskStorage({
  destination: uploadTemp,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
