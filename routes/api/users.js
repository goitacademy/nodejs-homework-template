const express = require('express')

const router = express.Router();

const ctrl = require('../../controllers/auth')

const { ctrlWrapper } = require('../../helpers')

const { schemas } = require('../../models/user')

const { validateBody, authenticate, upload } = require('../../meddlewares')


router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register))

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify))

router.post('/verify', validateBody(schemas.emailSchema), ctrlWrapper(ctrl.resendVerifyEmail))


router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login))

router.post('/logout', authenticate, ctrlWrapper(ctrl.logout))

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent))

router.patch('/', authenticate, validateBody(schemas.subscriptionSchema), ctrlWrapper(ctrl.updateSubscription))

router.patch('/avatars', authenticate, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatare))


module.exports = router
