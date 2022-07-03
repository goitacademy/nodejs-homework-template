const express = require('express')
const router = express.Router()
const { ctrlWrapper } = require('../../helpers')
const ctrl = require('../../controllers/auth')
const { validation, authenticate } = require('../../middlewares')
const { schemas } = require('../../models/user')

router.post(
  '/users/signup',
  validation(schemas.signup),
  ctrlWrapper(ctrl.signup),
)

router.post('/users/login', validation(schemas.signup), ctrlWrapper(ctrl.login))

router.get('/users/current', authenticate, ctrlWrapper(ctrl.getCurrent))

router.get('/users/logout', authenticate, ctrlWrapper(ctrl.logout))

router.patch(
  '/users/subscriprion',
  authenticate,
  ctrlWrapper(ctrl.updSubscription),
)

module.exports = router
