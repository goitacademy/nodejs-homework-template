const path = require('path');
const multer = require('multer');

const pathToTmpFolder = path.resolve(__dirname, '..', 'images_tmp');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathToTmpFolder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

module.exports = multer({ storage: storage });
