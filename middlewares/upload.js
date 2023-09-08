const multer = require('multer');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'avatars');

const multerConfig = multer.diskStorage({
  destination: publicDir,
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
