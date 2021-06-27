const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

const { regLogValidation } = require('../middlewares/userValidation')
const { protect } = require('../middlewares/authProtect')

router.post('/signup', regLogValidation, usersController.signUp)

router.post('/login', regLogValidation, usersController.logIn)

router.post('/logout', protect, usersController.logOut)

router.get('/current', protect, usersController.currentUser)

module.exports = router
