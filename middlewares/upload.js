const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '..', 'temp');

// console.log(tempDir);

// const test = () => {
//     console.log(tempDir);
// }
// test()

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: multerConfig
});

module.exports = upload;