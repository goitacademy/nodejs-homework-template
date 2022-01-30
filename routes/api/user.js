const express = require('express')
const router = express.Router()
const { authentication } = require('../../middlewares')
const { upload } = require('../../middlewares')

const {
  signupUser,
  loginUser,
  logoutUser,
  getUser,
  updateAvatar,
  userVerification,
  secondVerify,
} = require('../../controllers/userController')

router.post('/signup', signupUser)

router.post('/login', loginUser)

router.get('/logout', authentication, logoutUser)

router.get('/current', authentication, getUser)

router.patch('/avatars', authentication, upload.single('avatar'), updateAvatar)

router.post('/verify', secondVerify)
router.get('/verify/:verificationToken', userVerification)
module.exports = router
