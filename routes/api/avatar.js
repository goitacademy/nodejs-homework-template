const express = require('express')

const { users: ctrl } = require('../../controllers')
const { controllerWrapper, upload, authenticate } = require('../../middlewares')
const router = express.Router()

router.patch('/:id', controllerWrapper(authenticate), upload.single('avatarURL'), controllerWrapper(ctrl.updateAvatar))

module.exports = router
