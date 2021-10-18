const multer = require('multer')
const path = require('path')

const tempDir = path.join(__dirname, '../', 'temp')

const uploadConfig = multer.diskStorage({
  distination: (req, file, cb) => {
    cb(null, tempDir)
  },
  fileName: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: 2048
})

const upload = multer({
  storage: uploadConfig
})

module.exports = upload
