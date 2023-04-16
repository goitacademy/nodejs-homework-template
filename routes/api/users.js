const express = require('express')

const router = express.Router()

const {addUser, loginUser, logoutUser, getUserDetails, updateUserAvatar} = require('../../controllers')
const {asyncFuncCatch, userValidation, userTokenValidation, avatarUpload} = require('../../middlewares')

router.post('/register', userValidation, asyncFuncCatch(addUser))
router.post('/login', userValidation, asyncFuncCatch(loginUser))
router.post('/logout', asyncFuncCatch(userTokenValidation), asyncFuncCatch(logoutUser))
router.get('/current', asyncFuncCatch(userTokenValidation), asyncFuncCatch(getUserDetails))
router.patch('/avatars', asyncFuncCatch(userTokenValidation), avatarUpload, asyncFuncCatch(updateUserAvatar))


module.exports = router
