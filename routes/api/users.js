const express = require('express')

const useAuth = require('./useAuth')

const { upload } = require('../../helpers')

const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/current', useAuth, ctrl.getCurrentUser)

router.patch('/avatars', useAuth, upload.single('avatar'), ctrl.changeAvatar)

module.exports = router
