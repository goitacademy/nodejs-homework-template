const express = require('express')

const { ctrlWrapper, validation, auth } = require('../../middlewares')
const { joiUserSchema, joiSchemaSub } = require('../../models/user')
const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/signup', validation(joiUserSchema), ctrlWrapper(ctrl.signup))

router.post('/login', validation(joiUserSchema), ctrlWrapper(ctrl.login))

router.get('/logout', auth, ctrlWrapper(ctrl.logout))

router.get('/current', auth, ctrlWrapper(ctrl.current))

router.patch(
  '/',
  auth,
  validation(joiSchemaSub),
  ctrlWrapper(ctrl.updateSubscription)
)

module.exports = { usersRouter: router }
