const express = require('express')
const {
  controllerWrapper,
  authenticate,
  middlewarUpload,
} = require('../../middlewares')
const { user: ctrl } = require('../../controllers')
const router = express.Router()

router.patch(
  '/avatars',
  authenticate,
  middlewarUpload.single('avatar'),
  controllerWrapper(ctrl.updateAvatar)
)

module.exports = router
