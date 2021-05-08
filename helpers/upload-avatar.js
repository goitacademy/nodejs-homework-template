const multer = require('multer');
const path = require('path')
require('dotenv').config()
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})

const upload = multer({
  storage: storage,
  // limits: {  fileSize: 200000},
  fileFilter:  (req, file, cb)=>{
    if (file.mimetype.includes('image')) {
      cb(null, true)
    }
    const err = new Error('Файл не прошел валидацию на изображение')
    err.status = 400
    cb(err, false)
  }
})

module.exports = upload