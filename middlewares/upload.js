// Опрацьовує зображення(аватарка), що завантажується, і переносить її у тимчасову папку(tmp)

const multer = require('multer');
const path = require('path');

const { basedir } = global; 

const tmpDir = path.join(basedir, 'tmp'); 

const multerConfig = multer.diskStorage({
    destination: tmpDir,

    filename: (_req, file, cb) => {
        cb(null, file.originalname); 
    },
});

const upload = multer({
    storage: multerConfig,
});

module.exports = upload;