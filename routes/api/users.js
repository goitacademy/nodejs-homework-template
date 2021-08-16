const express = require('express')
const router = express.Router()

const {
  signupController,
  loginController,
  logoutController,
  currentController,
} = require('../../controllers/controller-users')
const { auth } = require('../../validation/auth')
const { userValidation } = require('../../validation/validation')

router
  .post('/signup', userValidation, signupController)
  .post('/login', userValidation, loginController)
  .post('/logout', auth, logoutController)
  .get('/current', auth, currentController)

module.exports = router