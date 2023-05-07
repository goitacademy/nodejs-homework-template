const multer = require('multer');
const path = require('path');
const { HttpError } = require('../helpers');

const tmpDir = path.join(__dirname, '../../', 'tmp');

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    // cb(null, file.originalname);
    const { _id } = req.user;
    const ext = path.extname(file.originalname);
    cb(null, `${_id}${ext}`);
  },
});

const upload = multer({
  storage: multerConfig,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new HttpError(422, `Only .png .jpg .jpeg format allowed!`));
    }
  },
});

module.exports = upload;
