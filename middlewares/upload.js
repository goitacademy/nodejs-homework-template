const multer = require('multer');
const path = require('path');

const tmpDir = path.join(__dirname, "../", "tmp"); // створюємо шлях до тимчасової папки "tmp"

const multerConfig = multer.diskStorage({
    destination: tmpDir,
    filename: async (req, file, cb) => {      
        cb(null, file.originalname);
    }
});


// middleware upload, яка збереже файл в папку "tmp", інформацію про нього передасть в req.file, а текстові дані в req.body
const upload =  multer({
   storage: multerConfig
});


module.exports = upload;