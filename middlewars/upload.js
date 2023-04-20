const multer = require('multer');
const path = require('path');

// const { httpError } = require('../helpers')

const tempDir = path.resolve('temp');

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: multerConfig,
})

module.exports = upload;