const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const Jimp = require('jimp');

const TMP_DIR = path.resolve('./tmp');
const PUBLIC_AVATARS_DIR = path.resolve('./public/avatars');

const upload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TMP_DIR);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.');
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const save = multer.diskStorage({
  destination: (req, file, cb) => {
    Jimp.read(file, (err, file) => {
      if (err) throw err;
      file
        .resize(250, 250) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(file.originalname); // save
    });
    cb(null, PUBLIC_AVATARS_DIR);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.');
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const avatarUploadMiddleware = multer({ storage: upload });
const saveAvatarMiddleware = multer({ storage: save });

module.exports = { avatarUploadMiddleware, saveAvatarMiddleware };
