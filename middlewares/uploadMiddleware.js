const path = require('path');
const multer = require('multer');

const tempDir = path.join(__dirname, "../temp");

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        cb(null, origin.filename)
    }
})

const upload = multer({storage:multerConfig 
})

module.exports = upload;