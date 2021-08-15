  
const multer = require('multer');
const path = require('path');

const tmpDir = path.join(process.cwd(), 'tmp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    filesize: 10000,
  },
});

const uploadMiddleware = multer({
  storage,
});

const upload = uploadMiddleware.single('avatar');

module.exports = upload;