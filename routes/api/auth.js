const express = require('express')
const authController = require('../../controllers/auth')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const { joiSchema } = require('../../models/user')
const router = express.Router()

<<<<<<< HEAD
=======
// регистрация
// аутентификация
// авторизация
// выход
>>>>>>> 6d693a3cc740165b63c58b70890927f2e0fa83f6

router.post('/register', validation(joiSchema), controllerWrapper(authController.register))

router.post('/login', validation(joiSchema), controllerWrapper(authController.login))

router.get('/logout', authenticate, controllerWrapper(authController.logout))
router.get('/current', authenticate, controllerWrapper(authController.current))

module.exports = router
