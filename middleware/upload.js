const path = require('node:path');
const multer = require('multer');
const crypto = require('node:crypto');

const destination = path.join(__dirname, '../tmp');

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, destination);
  },
  filename: (_, file, cb) => {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const suffix = crypto.randomUUID();

    const filename = `${basename}-${suffix}${extname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;
