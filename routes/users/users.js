  
const express = require('express')
const router = express.Router()
const {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscriptionUser,
  updateAvatar
} = require('../../controllers/users')
const {
  validateSignupUser,
  validateLoginUser,
  validateUpdateSubUser
} = require('./validationUsers')
const guard = require('../../helpers/guard')
const uploadAvatar = require('../../helpers/uploadAvatar')

router.post('/signup', validateSignupUser, signupUser)
router.post('/login', validateLoginUser, loginUser)
router.post('/logout', guard, logoutUser)
router.get('/current', guard, getCurrentUser)
router.patch('/', guard, validateUpdateSubUser, updateSubscriptionUser)
router.patch('/avatars', guard, uploadAvatar.single('avatar'), updateAvatar)

module.exports = router