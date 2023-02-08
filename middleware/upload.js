const multer = require('multer');
const path = require('path');

const tmpDirPath = path.join(__dirname, "../", "tmp");

const storageMulter = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tmpDirPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storageMulter });

module.exports = upload;