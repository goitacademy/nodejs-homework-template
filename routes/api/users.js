const express = require('express')
const { userSchema } = require('../../joiSchemas')
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlwares')
const { users: auth } = require('../../controllers')

const router = express.Router()

router.post('/singup', validation(userSchema), controllerWrapper(auth.signup))

router.post('/login', validation(userSchema), controllerWrapper(auth.signin))

router.post('/logout', authenticate, controllerWrapper(auth.signout))

module.exports = router
