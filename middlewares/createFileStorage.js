const multer = require('multer')
const path = require('path')

const createFileStorage = dir => {
  let storage
  try {
    storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, dir)
      },
      filename: (req, file, cb) => {
        const ext = path.parse(file.originalname).ext
        file.originalname = Date.now() + ext
        cb(null, file.originalname)
      },
      limits: {
        fileSize: 1048576,
      },
    })
    const upload = multer({
      storage: storage,
    })
    return upload
  } catch (err) {
    console.log(err.message)
  }
}
module.exports = {
  createFileStorage,
}
