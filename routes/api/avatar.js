const express = require('express')

const { users: ctrl } = require('../../controllers')
const { controllerWrapper, upload } = require('../../middlewares')
const router = express.Router()

router.patch('/:id', upload.single('avatarURL'), controllerWrapper(ctrl.updateAvatar))

module.exports = router
