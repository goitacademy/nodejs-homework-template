const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const imageController = require('../../controllers/imageController')

const upload = require('../../helpers/upload')
const guard = require('../../helpers/guard')

const {
  changeUserAvatarValidation,
} = require('../../validation/uploadAvatarValidation')

router
  .post('/current', guard, userController.getCurrentUser)
  .patch(
    '/avatars',
    [guard, upload.single('avatar'), changeUserAvatarValidation],
    imageController.avatar
  )

module.exports = router
