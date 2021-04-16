const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const guard = require('../../helpers/guard')


router.post('/signup', userController.reg)
router.post('/login', userController.login)
router.post('/logout', guard, userController.logout)
router.get('/current', guard, userController.current)
router.patch('/', guard, userController.subscription)


module.exports = router