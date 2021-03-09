const express = require('express')
const router = express.Router()
const authUserController = require('../../controllers/authUserController')
const guard = require('../../helpers/guard')

const {
  validateRegistration,
  validateLogin,
} = require('../../validation/authUserValidation')

router
  .post('/register', validateRegistration, authUserController.registration)
  .post('/login', validateLogin, authUserController.login)
  .post('/logout', guard, authUserController.logout)

module.exports = router
