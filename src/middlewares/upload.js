const multer = require('multer')

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/Volumes/Storage/nodejs-homework-rest-api/tmp')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 2048
  }
})

const upload = multer({
  storage: multerConfig
})

module.exports = upload
