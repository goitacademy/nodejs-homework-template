const multer = require('multer')
const path = require('path')

const tmpDir = path.join(__dirname, "../tmp")

const multerStorage = multer.diskStorage({
    destination: tmpDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    limits: {
        fileSize: 25 * 1024 * 1024 /* 25Mb */
    }
})

const upload = multer({ storage: multerStorage });

module.exports = upload