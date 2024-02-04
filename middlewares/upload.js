const multer = require("multer");
const path = require("path");

const tmpDirectory = path.join(__dirname, "../", "tmp");
const multerConfig = multer.diskStorage({
    destination: tmpDirectory,
    filename: (request, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: multerConfig,
});

module.exports=upload;