const express = require('express')

const usersController = require('../../controllers/users.controller')
const {
    usersValidate,
    isAuthorized,
    avatarUpload,
    avatarResize,
} = require('../../middleware/users.middleware')

const router = express.Router()

router.post('/register', usersValidate, usersController.registerUser)

router.post('/login', usersValidate, usersController.loginUser)

router.post('/logout', isAuthorized, usersController.logoutUser)

router.get('/current', isAuthorized, usersController.currentUser)

router.patch(
    '/avatar',
    isAuthorized,
    avatarUpload.single('avatar'),
    avatarResize,
    usersController.updateAvatar
)

module.exports = router
