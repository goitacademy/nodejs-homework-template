const multer = require('multer')
const path = require('path')

const tempDirectory = path.join(__dirname, '../tmp')

const uploadConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, tempDirectory)
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  },
  limits: {
    fileSize: 5140
  }
})

const uploadMiddleware = multer({
  storage: uploadConfig
})

module.exports = {
  uploadMiddleware
}
