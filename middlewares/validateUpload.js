const multer = require('multer');
const path = require('path');
const { FILESIZE } = require('../helpers/constants');

const tempDirectory = path.join(process.cwd(), process.env.UPLOAD_FOLDER);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}_${Date.now()}_${file.originalname}`);
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
