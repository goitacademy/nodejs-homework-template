const multer = require('multer')
const path = require('path')

const tempDir = path.join(__dirname, '../', 'temp')
const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const str = file.originalname
    const arr = str.split('.')
    const ext = arr[arr.length - 1]
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
  },
  limits: {
    fileSize: 1024
  }
})

const upload = multer({
  storage: multerConfig
})

module.exports = upload
