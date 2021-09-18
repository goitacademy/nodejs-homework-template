const multer = require('multer')
const path = require('path')

const tempDir = path.join(__dirname, '../', 'tmp')

const multerConfig = multer.diskStorage({
  destination: (_, __, cb) => { cb(null, tempDir) },
  filename: (_, file, cb) => { cb(null, file.originalname) },
  limits: { fileSize: 1048576 }
})

const upload = multer({ storage: multerConfig })

module.exports = upload
