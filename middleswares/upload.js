const multer = require("multer");                        // бібліотека для створення мідлвари, яка бере файли з указаного поля тіла запиту і зберігає у тимчасову папку, а текстові дані зберігає в req.body
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");     // створюємо шлях до тимчасової папки

const multerConfig = multer.diskStorage({                 // обект налаштувань
  destination: tempDir,                                   // шлях до тимчасової папки (усі файли будуть спочатку зберігатися сюди), а потім контроллер буде брати звідти 
  filename: (req, file, cb) => {
    cb(null, file.originalname);                        // file.originalname - зберігаємо файл під його оригінальним імям
  },
});                                                       // є налашт limit що встановити ліміт для файлів

const upload = multer({                                   // створюємо мідлвару multer
  storage: multerConfig,
});

module.exports = upload;
