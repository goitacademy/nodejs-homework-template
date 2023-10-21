const multer = require('multer');
const path = require('path');

const upload = multer({
  dest: path.join(__dirname, 'users/uploads')
});

module.exports = upload;
