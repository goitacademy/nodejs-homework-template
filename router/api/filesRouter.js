const express = require('express')
const router = express.Router()
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const AVATARS_DIR = path.resolve('./public/avatars')
const { asyncWrapper } = require('../../errorHelpers/apiHelpers')
const { uploadController } = require('../../controllers/filesController')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, AVATARS_DIR)
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.')
    cb(null, `${uuidv4()}.${extension}`)
  },
})
const uploadMiddleware = multer({ storage })
router.post(
  '/upload',
  uploadMiddleware.single('avatar'),
  asyncWrapper(uploadController),
)

module.exports = router
