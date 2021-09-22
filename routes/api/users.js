const express = require('express')
const { joiSchema } = require('../../models/user')

const {
  validation,
  controllerWrapper,
  authenticate,
} = require('../../middlewares')
const { users: ctrl } = require('../../controllers')

const router = express.Router()

const userValidationMiddleware = validation(joiSchema)

router.post('/register',
  userValidationMiddleware,
  controllerWrapper(ctrl.register)
)

router.get('/verify/:verificationToken', controllerWrapper(ctrl.verify))

router.post('/login', userValidationMiddleware, controllerWrapper(ctrl.login))

router.get('/logout',
  controllerWrapper(authenticate),
  controllerWrapper(ctrl.logout)
)

module.exports = router
