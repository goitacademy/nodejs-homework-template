const multer = require('multer');

const path = require('path');
const tempDir = path.resolve('temp');

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});


const upload = multer({
  storage: multerConfig,
  limits: {fileSize: 1024*1024}
})

module.exports = upload;