const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
<<<<<<< Updated upstream
    destination: (req, file, cb)=> {
        cb(null, tempDir)
    },
    filename: (req, file, cb)=> {
=======
    destination: tempDir,
    filename: (req, file, cb) => {
>>>>>>> Stashed changes
        cb(null, file.originalname)
    },
    limits: {
        fileSize: 2048
    }
});

const upload = multer({
<<<<<<< Updated upstream
    storage: multerConfig
})
=======
    storage: multerConfig,
});

module.exports = upload;
>>>>>>> Stashed changes

