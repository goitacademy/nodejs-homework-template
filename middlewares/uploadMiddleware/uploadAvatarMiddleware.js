const multer = require("multer");
const path = require("path");

const tempDir = path.resolve('./tmp');

const storage = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
   
});

const uploadAvatarMiddleware = multer({ storage });

module.exports = {
    uploadAvatarMiddleware
}
