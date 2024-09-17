const multer = require('multer')
// для создания пути к временной папке
const path = require('path')

// путь к временной папке // все файлы будут сохраняться здесь

const tempDir = path.join(__dirname, '../', 'temp')

// создаем настройки
const multerConfig = multer.diskStorage({
  // destination - путь к временной папке передаём
  destination: tempDir,
  // если нужно сохранять в базе не под тем именем что пришло используем это , но originalname - это сохранение под тем же
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

// создаем миддваре для сохранения данных/ Теперь этот мидваребудет сохранять файлы под ориг именем

const upload = multer({
  storage: multerConfig
})

module.exports = upload
