const multer = require('multer')
const path = require('path')
const httpCode = require('./httpCode')
require('dotenv').config()
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR)
const avatarSize = 2000000 //2Mb
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: avatarSize },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
            cb(null, true)
            return
        }
    const err = new Error('Загружено не изображение')
    err.status = httpCode.BAD_REQUEST
    cb(err)
    }
})

module.exports = upload