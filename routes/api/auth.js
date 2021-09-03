const express = require('express')
const router = express.Router()

const { validation } = require('../../middlewares')
const { joiUserSchema } = require('../../model')
const { auth: ctrl } = require('../../controllers')

const validationUserMiddleware = validation(joiUserSchema)

router.post('/users/signup', validationUserMiddleware, ctrl.signup)

// router.post('/users/signin', ctrl.signin)

// router.get('/users/signout', ctrl.signout)

module.exports = router