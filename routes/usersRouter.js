const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.get('/current', usersController.userCurrent)

router.post('/signup', usersController.userSignup)

router.post('/login', usersController.userLogin)

router.post('/logout', usersController.userLogout)

router.patch('/current', usersController.userUpdateSubscription)

module.exports = router
