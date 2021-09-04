const express = require('express')
const router = express.Router()

const { validation, authenticate } = require('../../middlewares')
const { joiUserSchema } = require('../../model')
const { auth: ctrl } = require('../../controllers')

const validationUserMiddleware = validation(joiUserSchema)

router.post('/users/signup', validationUserMiddleware, ctrl.signup)

router.post('/users/signin', validationUserMiddleware, ctrl.signin)

router.get('/users/signout', authenticate, ctrl.signout)

module.exports = router