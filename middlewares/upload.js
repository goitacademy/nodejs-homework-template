const multer = require('multer');
const path = require('path');

// шлях до тимчасової папки
const tmpDir = path.join(__dirname, '../', 'tmp');

// створюємо об'єкт налаштувань
const multerConfig = multer.diskStorage({
    destination: tmpDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
}
});

// створюємо мідлвар для збереження файлів
const upload = multer({
    storage: multerConfig,
});

module.exports = upload;