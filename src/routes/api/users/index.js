const express = require('express')
const router = express.Router()

const { usersController } = require('../../../controller')
const guard = require('./../../../helpers/guard')
const upload = require('../../../helpers/upload')
const { signupAccountLimiter } = require('../../../helpers/userSignupRateLimit')
const { loginAccountLimiter } = require('../../../helpers/userLoginRateLimit')

const {
  validationSignupUser,
  validationLoginUser,
  validationPatchSubscriptionUser,
} = require('./validate.js')

router
  .patch(
    '/',
    [guard, validationPatchSubscriptionUser],
    usersController.updateUserSubscription,
  )
  .post(
    '/signup',
    [signupAccountLimiter, validationSignupUser],
    usersController.signupUser,
  )
  .post(
    '/login',
    [loginAccountLimiter, validationLoginUser],
    usersController.loginUser,
  )
  .post('/logout', [guard], usersController.logoutUser)
  .get('/current', [guard], usersController.getCurrentUser)
  .patch(
    '/avatars',
    [guard, upload.single('file')],
    usersController.updateUserAvatar,
  )
  .patch(
    '/avatars/cloud',
    [guard, upload.single('file')],
    usersController.updateCloudUserAvatar,
  )

module.exports = router