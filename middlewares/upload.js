const multer = require("multer"); 
 // npm install --save multer для відправлення файлів
 const path = require("path");

const tempDir =  path.join(__dirname,  "..","temp");
//шлях до тимчасової папки

//обэкт налаштувань до тимчасовоъ папки
const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename:(req, file, cb)=>{
        //cb колбек ф-ція, під яким імям зберігати файли
        cb(null, file.originalname);
    }
});

//міделвар
const upload = multer ({storage: multerConfig});

module.exports = upload;
