const multer = require('multer')
const path = require('path')

const avatarDir = path.join(__dirname, '../', 'public', 'avatars')

const storage = multer.diskStorage({
  destination: avatarDir,
  filename: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, file.originalname);
    }
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;