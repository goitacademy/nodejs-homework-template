// for save file to temp and after anyway

const multer = require('multer');

const path = require('path');

const tempDir = path.resolve('temp');

const { HttpError } = require('../helpers');


// storage
const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, `${uniquePrefix}_${file.originalname}`);
    }
});

const upload = multer({
    storage: multerConfig,
    // limits: {
    //     fileSize: 1024*1024*5
    // },
    // fileFilter: (req, file, cb) => { 
    //     const extention = file.originalname.split(".").pop();
    //     if (extention !== "jpg" || extention !== "jpeg") { 
    //         cb(HttpError(400, "file format not allow"))
    //     }
    //     cb(null, true);
    // }
}); 



module.exports = upload;