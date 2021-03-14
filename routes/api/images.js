const express = require('express')
const router = express.Router()
const imageController = require('../../controllers/imageController')

const guard = require('../../helpers/guard')
const upload = require('../../helpers/upload')

const {
  uploadAvatarValidation,
} = require('../../validation/uploadAvatarValidation')

router.patch(
  '/',
  [guard, upload.single('avatar'), uploadAvatarValidation],
  imageController.avatar
)

module.exports = router
