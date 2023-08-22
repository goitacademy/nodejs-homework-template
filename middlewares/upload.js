const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '../', 'temp');

const storage = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage,
});

module.exports = upload;
