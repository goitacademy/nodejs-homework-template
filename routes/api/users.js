const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController.js')
const authMiddleware = require('../../middlewares/authMiddleware.js')

router.post('/signup', usersController.signup)
router.post('/login', usersController.login)
router.post('/logout', usersController.logout)
router.get('/activate/:link', usersController.activate)
router.get('/refresh', usersController.refresh)
router.get('/current', authMiddleware, usersController.getCurrentUser)

module.exports = router