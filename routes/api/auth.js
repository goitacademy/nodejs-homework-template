const express = require('express')
const router = express.Router()
const { validation, authenticate} = require('../../middlewares')
const {joySchema} = require('../../model/user')
const authControllers = require('../../controllers/auth')

router.post('/register', validation(joySchema), authControllers.registerController)
router.post('/login', validation(joySchema), authControllers.loginController)
router.get('/logout', authenticate, authControllers.logoutController)
router.get('/current',  authenticate, authControllers.currentController)

module.exports = router