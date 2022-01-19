const express = require('express')
const router = express.Router()
const { authenticate } = require('../../middlewares')

const {
  signupUser,
  loginUser,
  logoutUser,
  getUser,
} = require('../../controllers/userController')

router.post('/signup', signupUser)

router.post('/login', loginUser)

router.get('/logout', authenticate, logoutUser)

router.get('/current', authenticate, getUser)

module.exports = router
