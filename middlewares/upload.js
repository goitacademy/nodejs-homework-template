const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, 'temp'); // путь куда сохранять временные файлы

// обьект настроек
const multerConfig = multer.diskStorage({   
    // указываем где сохраняем файл
    destination: tempDir,
    // с каким именем
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: multerConfig,
})

module.exports = upload;