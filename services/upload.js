const multer = require('multer')
const path = require('path')
require('dotenv').config()
const tempDir = path.join(process.cwd(), 'tmp')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
            cb(null, true)
            return
        }
        cb(null, false)
    }
})

module.exports = upload