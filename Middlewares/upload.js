const multer = require("multer");
const path = require("path");
const Jimp = require("jimp");

const tempDir = path.join(__dirname, '../', 'temp');
console.log(tempDir)
const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
    })

const upload = multer({
    storage: multerConfig
});
    
module.exports = upload;