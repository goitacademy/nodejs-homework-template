const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    limits: {
        fileSize: 2048,
    },
});

const upload = multer({
    storage: multerConfig,
    fileFilter: function fileFilter(req, file, cb) {
        if (file.mimetype.includes("image")) {
            cb(null, true);
        } else {
            const err = new Error();
            err.status = 404;
            err.message = "Wrong format";
            cb(err);
        }
    },
});

module.exports = upload;