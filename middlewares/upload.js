const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, "../", "temp"); // створюємо шлях до тимчасової папки "temp"

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: async (req, file, cb) => {      
        cb(null, file.originalname);
    }
});


// middleware upload, яка збереже файл в папку "temp", інформацію про нього передасть в req.file, а текстові дані в req.body
const upload =  multer({
   storage: multerConfig
});


module.exports = upload;