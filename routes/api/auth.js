const express = require('express')
const router = express.Router()

const { auth: ctrl } = require('../../controllers')
const {
  validation,
  controllerWrapper,
  aunthenticate,
} = require('../../middlewares')
const { joiUserSchema } = require('../../models/user')

const validationMiddleware = validation(joiUserSchema)

router.post(
  '/users/signup',
  validationMiddleware,
  controllerWrapper(ctrl.signup),
)

router.post('/users/login', validationMiddleware, controllerWrapper(ctrl.login))

router.get(
  '/users/logout',
  controllerWrapper(aunthenticate),
  controllerWrapper(ctrl.logout),
)

router.get(
  '/users/current',
  controllerWrapper(aunthenticate),
  controllerWrapper(ctrl.current),
)
router.get(
  '/contacts?',
  controllerWrapper(aunthenticate),
  controllerWrapper(ctrl.favorite),
)

module.exports = router
