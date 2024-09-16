const multer = require('multer');
const path = require('path');

const tmDir = path.join(__dirname, '../', 'tmp');
const multerConfig = multer.diskStorage({
    destination: tmDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: multerConfig,
});

module.exports = upload;