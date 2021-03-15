const express = require('express')
const router = express.Router()
// const validate = require('./validation')
const userController = require('../../../controllers/users')
const guard = require('../../../helpers/guard')

router.post('/registration', userController.reg)
router.post('/login', userController.login)
router.post('/logout', guard, userController.logout)

module.exports = router
