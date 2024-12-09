const multer = require('multer');
const path = require('path');
const fs = require('fs');

const tmpDir = path.join(__dirname, '..', 'tmp', 'avatars');

fs.mkdir(tmpDir, { recursive: true }, (err) => {
  if (err) {
    console.error('Error creating tmp/avatars folder:', err);
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir); 
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`; 
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;
