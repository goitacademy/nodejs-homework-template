const express = require('express')

const { JoiUserSchema } = require('../../models/user')
const { authenticate, validation, tryCatchWrapper, upload } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

const userValidationMiddleware = validation(JoiUserSchema)

router.post('/register', userValidationMiddleware, tryCatchWrapper(ctrl.signup))

router.post('/login', userValidationMiddleware, tryCatchWrapper(ctrl.login))

router.get('/current', tryCatchWrapper(authenticate), tryCatchWrapper(ctrl.current))

router.get('/logout', tryCatchWrapper(authenticate), tryCatchWrapper(ctrl.logout))

router.patch('/', tryCatchWrapper(authenticate), tryCatchWrapper(ctrl.updateCurrentUserSubscription))

router.patch(
  '/avatars',
  tryCatchWrapper(authenticate),
  tryCatchWrapper(upload.single('avatarURL')),
  tryCatchWrapper(ctrl.updateUserAvatar)
)

module.exports = router
