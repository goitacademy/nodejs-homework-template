const path = require('path');
const multer = require('multer');
const { createError } = require('../helpers');

const tempDir = path.join(__dirname, '../', 'temp');

const storage = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = function (req, res, next) {
    const upload = multer({ storage }).single('avatar');
    upload(req, res, function (err) {
        if (err) {
            next(createError(400, err.message));
        }
        if (!req?.file) {
            next(createError(400, 'Unexpected image'));
        }
        next();
    });
};

module.exports = upload;