const express = require('express')
const router = express.Router()
const { users } = require('../../controllers')
const { controllerWrapper, validation, authenticate, upload } = require('../../middlewares')
const { subscriptionSchema } = require('../../models/user')

router.get('/current', authenticate, controllerWrapper(users.getCurrentUser))

router.patch('/', authenticate, validation(subscriptionSchema), controllerWrapper(users.updateSubscription))

router.patch('/avatars', authenticate, upload.single('avatar'), controllerWrapper(users.updateAvatar))

router.get('/verify/:verificationToken', controllerWrapper(users.verify))

router.post('/verify', controllerWrapper(users.repeatVerify))

module.exports = router
