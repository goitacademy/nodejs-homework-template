const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logoutUser, getCurrentUser } = require('../../../controllers/usersControllers')
const { registerUserValidation, loginUserValidation } = require('./usersValidation')
const guard = require('../../../helpers/guard')

router
  .post('/auth/register', registerUserValidation, registerUser)
  .post('/auth/login', loginUserValidation, loginUser)
  .post('/auth/logout', guard, logoutUser)
  .get('/current', guard, getCurrentUser)

module.exports = router
