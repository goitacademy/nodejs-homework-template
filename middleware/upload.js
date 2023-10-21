const multer = require('multer')
const path = require('path')

const tmpDir = path.join(__dirname, '../tmp');

const multerStorage = multer.diskStorage({
    destination: tmpDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: multerStorage,
    limits: {
        fileSize: 25 * 1024 * 1024, // 25MB
    },
});

module.exports = upload