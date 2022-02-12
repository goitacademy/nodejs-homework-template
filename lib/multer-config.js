const multer = require('multer');
const path = require('path');

const PATH_TO_TEMP = '../temp';

const tempDir = path.join(__dirname, PATH_TO_TEMP);

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file,cb) => {
        cb(null, file.originalname)
    }
});

module.exports = multerConfig;