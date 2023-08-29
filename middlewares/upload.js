const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

// створюєио об'єкт налаштувань
const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

// створюєио middleware для об'єкта налаштувань
const upload = multer({
    storage: multerConfig
})

module.exports = upload;