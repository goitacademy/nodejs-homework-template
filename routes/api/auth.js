const express = require('express')

const { auth: ctrl } = require('../../controllers')
const { joiUserSchema } = require('../../model/user')
const { validation, authenticate, controllerWrapper } = require('../../middlewares')

const router = express.Router()

router.post('/register', validation(joiUserSchema), controllerWrapper(ctrl.register))

router.post('/login', validation(joiUserSchema), controllerWrapper(ctrl.login))

router.get('/logout', controllerWrapper(authenticate), controllerWrapper(ctrl.logout))

module.exports = router
