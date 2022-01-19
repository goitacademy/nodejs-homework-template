const express = require('express')
const router = express.Router()
const { authentication } = require('../../middlewares')

const {
  signupUser,
  loginUser,
  logoutUser,
  getUser,
} = require('../../controllers/userController')

router.post('/signup', signupUser)

router.post('/login', loginUser)

router.get('/logout', authentication, logoutUser)

router.get('/current', authentication, getUser)

module.exports = router
