const express = require('express')

const ctrl = require('../../controllers/users')

const { ctrlWrapper } = require('../../helpers')

const { validationBody, authenticate } = require('../../middlewares')

const { schemas } = require('../../models/user')

const router = express.Router()

router.post(
  '/register',
  validationBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register),
)

router.post(
  '/login',
  validationBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login),
)

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent))

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout))

module.exports = router
