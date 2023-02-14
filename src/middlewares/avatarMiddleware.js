const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('./tmp'));
    },
    filename: function (req, file, cb) { // image.png
        const [, extension] = file.originalname.split('.');
        cb(null, `${uuidv4()}.${extension}`);
  }
});
const avatarMiddleware = multer({ storage });

module.exports = {
    avatarMiddleware
}