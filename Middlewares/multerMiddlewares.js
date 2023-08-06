const multer = require('multer');
const path = require('path');

const tmpDir = path.join(__dirname, '../', 'tmp');

const multerStorage = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cbk) => {
    cbk(null, file.originalname);
  },
});

const upload = multer({ multerStorage });

module.exports = upload;