const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '../', 'temp')

const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    limits: {
        fileSize: 2048
    }
})

const upload = multer({
    storage: multerConfig,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
          cb(null, true);
          return;
        }
        cb(null, false);
      },
})

module.exports = upload;