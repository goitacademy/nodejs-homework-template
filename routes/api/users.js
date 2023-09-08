const express = require('express')
const router = express.Router()
const jsonParcer = express.json();
const {
	registerUser,
	logInUser,
	logOutUser,
	getCurrentUser,
	changeAvatar,
} = require('../../controllers/usersController.js')
const auth = require("../../middleware/auth.js")
const avatar = require("../../middleware/avatar.js")

router.get('/current', auth, jsonParcer, getCurrentUser)

router.post('/register', jsonParcer, registerUser)

router.post('/login', jsonParcer, logInUser)

router.post('/logout', auth, jsonParcer, logOutUser)

router.patch('/:id/avatar', auth, avatar.single('avatar'), changeAvatar)


module.exports = router
