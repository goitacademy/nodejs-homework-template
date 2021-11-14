const express = require('express')
const router = express.Router()

const {
  validation,
  controllerWrapper,
  authenticate,
} = require('../../middlewares')

const { auth: controllers } = require('../../controllers')
const { joiSchemaUser } = require('../../models/user')

router.post(
  '/users/signup',
  validation(joiSchemaUser),
  controllerWrapper(controllers.registration)
)

router.post(
  '/users/login',
  validation(joiSchemaUser),
  controllerWrapper(controllers.login)
)

router.get(
  '/users/current',
  authenticate,
  controllerWrapper(controllers.curentUser)
)

router.get('/users/logout', authenticate, controllerWrapper(controllers.logout))

module.exports = router
