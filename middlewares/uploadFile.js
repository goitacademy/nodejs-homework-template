const path = require('path');
const multer = require('multer');

const tempDir = path.join(__dirname,"../", 'temp');
// const avatarDir = path.join(__dirname, 'public', 'avatars');


const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    limits: {
        fileSize: 2048
    }
});

const upload = multer({
    storage: multerConfig
});
console.log(tempDir)

module.exports = upload;