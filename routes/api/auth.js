const express = require('express')
const router = express.Router()
const { ctrlWrapper } = require('../../helpers')
const ctrl = require('../../controllers/auth')
const { validation } = require('../../middlewares')
const { schemas } = require('../../models/user')

router.post(
  '/users/signup',
  validation(schemas.signup),
  ctrlWrapper(ctrl.signup),
)

router.post('/users/login', validation(schemas.signup), ctrlWrapper(ctrl.login))

module.exports = router
