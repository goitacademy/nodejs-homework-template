const express = require('express')

const { validation, controllerWrapper } = require('../../middlewares')
const { auth: controllers } = require('../../controllers')
const { joiSchemaUser } = require('../../models')

const router = express.Router()

router.post(
  '/registration',
  validation(joiSchemaUser),
  controllerWrapper(controllers.registration)
)

router.post(
  '/login',
  validation(joiSchemaUser),
  controllerWrapper(controllers.login)
)

module.exports = router
