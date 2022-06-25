const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
require('dotenv-expand')(require('dotenv').config())

const { UPLOADS } = require('./uploadPath')

function destination(req, file, next) {
  next(null, UPLOADS)
}

function filename(req, file, next) {
  next(null, uuidv4() + path.extname(file.originalname))
}

function fileFilter(req, file, next) {
  if (file.mimetype.includes('image')) {
    next(null, true)
    return
  }

  next(null, false)
  // next({
  //   status: HTTP_CODES.BAD_REQUEST,
  //   code: HTTP_CODES.BAD_REQUEST,
  //   message: 'missing field favorite',
  // })
}

const storage = multer.diskStorage({
  destination,
  filename,
})

const upload = multer({
  fileFilter,
  storage: storage,
  limits: { fileSize: 2_000_000 },
})

module.exports = upload