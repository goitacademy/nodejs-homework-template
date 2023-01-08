const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, tempDir);
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },

    limits: {
        fileSize: 2048,
    },
});

const upload = multer({
    storage: multerConfig,
});

module.exports = upload;
