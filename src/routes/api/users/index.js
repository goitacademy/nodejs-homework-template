const express = require('express')
const router = express.Router()

const { usersController } = require('../../../controller')
const guard = require('./../../../helpers/guard')
const { signupAccountLimiter } = require('../../../helpers/userSignupRateLimit')
const { loginAccountLimiter } = require('../../../helpers/userLoginRateLimit')

const {
  validationSignupUser,
  validationLoginUser,
  validationPatchSubscriptionUser,
} = require('./validate')

router
  .patch(
    '/',
    [guard, validationPatchSubscriptionUser],
    usersController.subscription,
  )
  .post(
    '/signup',
    [signupAccountLimiter, validationSignupUser],
    usersController.signup,
  )
  .post(
    '/login',
    [loginAccountLimiter, validationLoginUser],
    usersController.login,
  )
  .post('/logout', [guard], usersController.logout)
  .get('/current', [guard], usersController.current)

module.exports = router