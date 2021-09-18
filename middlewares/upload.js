const multer = require('multer')
const path = require('path')

const tempDir = path.join(__dirname, '../', 'temp') // шлях до тимчасової папки

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
    console.log('mW* file.originalname:', file.originalname)
  },
  limits: {
    fileSize: 1024,
  },
})

const upload = multer({
  storage: multerConfig,
})

module.exports = upload
