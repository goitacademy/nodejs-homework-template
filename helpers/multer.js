const path = require('path')
const multer = require('multer')

const tempDir = path.join(process.cwd(), 'temp')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({
    storage,
    limits: {
        fileSize: 2000000
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
            cb(null, true)
        }
        cb(null, false)
    }
})

module.exports = upload
