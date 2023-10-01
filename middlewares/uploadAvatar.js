const multer = require("multer");
const path = require("path");
const { HttpErrors } = require("../helpers");

const tmpDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
    destination: tmpDir,
});

const upload = multer({
    storage: multerConfig,
    fileFilter: (req, file, cb) => {
        if(
            file.mimetype === "image/png"||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/bmp" 
        ){
            cb(null, true);
        } else{
            cb(null,false)
            return cb(HttpErrors(400, "format file must be: .png, .jpg, .jpeg, .bmp"))
        }
    },
})

module.exports = upload;