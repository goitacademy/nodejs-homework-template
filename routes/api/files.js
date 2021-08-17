const express = require('express')
const multer = require('multer')
const path = require('path')

const UPLOAD_DIR = path.resolve('./tmp')

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const { auth } = require('../../validation/auth')

const {
  avatarsController,
} = require('../../controllers/controller-files')

const uploadMiddleware = multer({
  storage: storage,
  limits: { fileSize: 1048576 },
})

router
  .patch('/avatars', auth, uploadMiddleware.single('avatar'), avatarsController)

module.exports = router