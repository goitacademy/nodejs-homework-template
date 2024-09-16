const multer = require('multer');
const path = require('path');

const tmpDir = path.join(__dirname, "../", "tmp");

const storageConfig = multer.diskStorage({
    destination: tmpDir,
    filename: (_, file, cb)=>{
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage:storageConfig, 
})

module.exports = upload;