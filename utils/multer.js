const multer = require("multer");
const path = require("path");

const dirname = __dirname.split(path.sep).slice(0, __dirname.split(path.sep).length - 1);
const tempPath = path.join(...dirname, "temp");

const uploadConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempPath);
    },
    filename: (req, file, cb) => {
        const splitName = file.originalname.split(".");
        const ext = splitName[splitName.length - 1];
        const fileName = `${splitName.slice(0, splitName.length - 1)}-${Date.now()}`;
        cb(null, `${fileName}.${ext}`);
    },
    limits: {
        fileSize: 2048,
    },
});

const upload = multer({
    storage: uploadConfig,
});

module.exports = upload;
