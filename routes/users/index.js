const express = require('express')
const router = express.Router()
const uploadAvatar = require('../../helper/upload-avatar')
const {
    registration,
    login,
    logout,
    current,
    updateAvatar,
    verify,
    repeatEmailVerify,  
} = require('../../controllers/users')
const guard = require('../../helper/guard')

router.post('/registration', registration)

router.post('/login', login)

router.post('/logout', guard, logout)

router.get('/current', guard, current)

router.patch('/avatars', guard, uploadAvatar.single('avatar'),  updateAvatar)

router.get('/verify/:token', verify)

router.get('/verify', repeatEmailVerify)

module.exports = router
