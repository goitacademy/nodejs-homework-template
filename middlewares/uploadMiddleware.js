const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const tmpDir = path.resolve('./tmp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    const [filename, extention] = file.originalname.split('.');
    cb(null, `${uuidv4()}.${extention}`);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = { uploadMiddleware };
