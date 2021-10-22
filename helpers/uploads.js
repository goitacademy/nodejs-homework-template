
const multer = require('multer')
require('dotenv').config()
// const { CustomError } = require('./customError')
const UPLOAD_DIR = process.env.UPLOAD_DIR

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}_${file.originalname}`)
  },
})

const upload = multer({
  storage: storage,
  limits: { fieldSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      return cb(null, true)
    }

    // Вы можете всегда вернуть ошибку, если что-то пошло не так:
    cb(new Error(400, 'Wrong format for avatar'))
  },
})

module.exports = upload