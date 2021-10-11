const multer = require('multer')
const path = require('path')
const tmpDir = path.join(__dirname, '../', 'tmp')

// const uploadDir = path.join(__dirname, 'public')
const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 2048,
  },
})
const upload = multer({
  storage: uploadConfig,
})

module.exports = upload
