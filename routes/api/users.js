const express = require('express')

const useAuth = require('./useAuth')

const { upload } = require('../../helpers')

const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/current', useAuth, ctrl.getCurrentUser)

router.patch('/avatars', useAuth, upload.single('avatar'), ctrl.changeAvatar)

router.get('/verify/:verifyToken', ctrl.tokenVerification)

router.post('/verify', express.json(), ctrl.resendEmail)

module.exports = router
