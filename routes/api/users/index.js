const express = require('express')
const router = express.Router()
const userController = require('../../../controllers/users') // registration, logIn, logOut
const { userRegistration } = require('../users/validation')

// === router REGISTRATION ===
router.post('/auth/register', userController.reg)

// === router LOGIN ===
router.post('/auth/login', userController.logIn)

// === router LOGOUT ===
router.post('/auth/logout', userController.logOut)

// === router GET ===
router.get('/current', userController.logOut)

module.exports = router
