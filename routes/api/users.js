const express = require('express')
const { auth, validation, upload, ctrlWrapper } = require('../../middlewares')
const { users: ctrl } = require('../../controllers')
const { joiSchema } = require('../../models/user')

const router = express.Router()

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent))

router.post('/signup', validation(joiSchema), ctrlWrapper(ctrl.signup))

router.post('/login', validation(joiSchema), ctrlWrapper(ctrl.login))

router.get('/logout', auth, ctrlWrapper(ctrl.logout))

router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar))

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail))

module.exports = router
