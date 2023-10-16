const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

// налаштування
const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

// мідлвара
const upload = multer({
    storage: multerConfig
});


module.exports = upload;