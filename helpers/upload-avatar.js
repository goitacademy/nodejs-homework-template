const multer = require('multer')
const path = require('path')
require('dotenv').config()
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2000000, // maxfile'size === 2 mb
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
            // To accept the file pass `true`, like so:
          cb(null, true)
          return
        }
      const err = new Error('Недопустимый формат!')
      err.status = 400
      cb(err)
        // To reject this file pass `false`, like so:
        // cb(null, false)
        // You can always pass an error if something goes wrong:
    },
})
  
module.exports = upload
