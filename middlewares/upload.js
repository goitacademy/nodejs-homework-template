const multer = require("multer");
const path = require("path");
var Jimp = require('jimp');

const tempDir = path.join(__dirname, "../", "tmp");

// const multerConfig =  multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, tempDir);
//     },
//     filename: (req, file, cb) =>{
//         cb(null, file.originalname);
//     },
//     limits: {
//         fileSize: 1024
//     }
// });

// const upload = multer({
//     storage: multerConfig
// });

// module.exports = upload;
const multerConfig =  multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, tempDir);
    },
    filename: (req, file, cb) =>{
        const {id} = req.params;
        const newNameAvatar = `${id}-${file.originalname}`;
        cb(null, newNameAvatar);
    },
    limits: {
        fileSize: 1024
    }
});

const upload = multer({
    storage: multerConfig
});

module.exports = upload;
