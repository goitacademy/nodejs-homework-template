const multer = require('multer');
const path = require('path');
const { DIRNAME, FILESIZE } = require('../helpers/constants');

const temporaryDirectory = path.normalize(process.cwd(), DIRNAME.TEMP);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, temporaryDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const validateUpload = multer({
  storage: storage,
  limits: { fileSize: FILESIZE.ONEMB },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) return cb(null, true);

    cb(new Error('Only images are allowed!'));
  },
});

module.exports = validateUpload;
