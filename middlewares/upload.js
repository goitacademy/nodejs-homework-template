const multer = require("multer");

const path = require("path");

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        cb( null, file.originalname);
    }
});

const limits = {
    fileSize: 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
    cb(null, true);
};

const upload = multer({
    storage,
    limits,
    fileFilter
});

module.exports = upload;