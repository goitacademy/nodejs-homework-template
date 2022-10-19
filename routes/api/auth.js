

const express = require('express')

const { basedir } = global

const ctrl = require(`${basedir}/controllers/auth`)

const { controllersWrapper } = require(`${basedir}/helpers`)

const { auth, upload } = require(`${basedir}/middlewares`)

const router = express.Router()

router.post('/register', controllersWrapper(ctrl.register))

router.get('/verify/:verificationToken', controllersWrapper(ctrl.verifyEmail))

router.post('/verify', controllersWrapper(ctrl.resendVerifyEmail))

router.post('/login', controllersWrapper(ctrl.login))

router.patch('/:userId/user', controllersWrapper(ctrl.updateUserSubscription))

router.get('/current', auth, controllersWrapper(ctrl.getCurrent))

router.get('/logout', auth, controllersWrapper(ctrl.logout))

router.patch(
  '/users/avatars',
  auth,
  upload.single('avatar'),
  controllersWrapper(ctrl.setAvatar)
)

module.exports = router