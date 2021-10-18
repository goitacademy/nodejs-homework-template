const express = require('express')
const {
  userSchema,
  userSubscriptionUpdateSchema,
  userEmailSchema,
} = require('../../joiSchemas')
const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require('../../middlwares')
const { users: auth } = require('../../controllers')

const router = express.Router()

router.post('/singup', validation(userSchema), controllerWrapper(auth.signup))

router.get('/verify/:verifyToken', controllerWrapper(auth.verify))

router.post(
  '/verify',
  validation(userEmailSchema),
  controllerWrapper(auth.repeatVerify)
)

router.post('/login', validation(userSchema), controllerWrapper(auth.signin))

router.post('/logout', authenticate, controllerWrapper(auth.signout))

router.get('/current', authenticate, controllerWrapper(auth.currentUser))

router.patch(
  '/subscription',
  authenticate,
  validation(userSubscriptionUpdateSchema),
  controllerWrapper(auth.updateSubscription)
)
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  controllerWrapper(auth.updateAvatar)
)

module.exports = router
