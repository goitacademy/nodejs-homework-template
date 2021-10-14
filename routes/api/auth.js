const express = require('express')

const { joiSchema } = require('../../models/user')
const { controllerWrapper, validation } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

// 1. Регистрация нового пользователя.
// 2. Аутентификация (логин) зарегистрированного пользователя.
// 3. Авторизация аутентифицированного (зашедшего на сайт) пользователя.
// 4. Выход (Logout).

// api/auth/register
router.post('/register', validation(joiSchema), controllerWrapper(ctrl.register))
// router.post('signup')

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))
// router.post('/signin')

router.get('/logout', controllerWrapper(ctrl.logout))
// router.get('signout')

module.exports = router
