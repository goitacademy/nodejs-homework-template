const express = require('express')
const router = express.Router()
const jsonParcer = express.json();
const {
	registerUser,
	logInUser,
	logOutUser,
	getCurrentUser
} = require('../../controllers/usersController.js')
const auth = require("../../middleware/auth.js")


router.post('/register', jsonParcer, registerUser)

router.post('/login', jsonParcer, logInUser)

router.post('/logout', auth, jsonParcer, logOutUser)

router.get('/current', auth, jsonParcer, getCurrentUser)


module.exports = router
