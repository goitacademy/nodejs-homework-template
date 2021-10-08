const express = require('express')
const { userSchema, userSubscriptionUpdateSchema } = require('../../joiSchemas')
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

router.get('/current', authenticate, controllerWrapper(auth.currentUser))

router.patch(
  '/subscription',
  authenticate,
  validation(userSubscriptionUpdateSchema),
  controllerWrapper(auth.updateSubscription)
)

module.exports = router
