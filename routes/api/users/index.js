const express = require('express')
const router = express.Router()
const validate = require('./validation')
const userController = require('../../../controllers/users')

router.post('/registration', userController.reg)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
module.exports = router