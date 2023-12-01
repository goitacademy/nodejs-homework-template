const multer = require("multer");
const path = require("node:path");
const crypto = require("node:crypto");

const tempDir = path.join(__dirname, "../", "temp"); // path to the temp storage

const multerConfig = multer.diskStorage({
    destination: (req, file, cb)=>{
        // console.log(file)  
        cb(null, tempDir)
    },
    filename: (req, file, cb)=>{
        console.log(file)
        const extname = path.extname(file.originalname); // png
        const basename = path.basename(file.originalname, extname); // file name w/o extension
        const suffix = crypto.randomUUID();
        console.log(basename);
        cb(null, `${basename}-${suffix}${extname}`);
    },
    limits: {
        fileSize: 2048
    }
})
const upload = multer({
    storage: multerConfig
})

module.exports = upload; 