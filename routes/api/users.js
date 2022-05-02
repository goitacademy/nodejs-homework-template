const express = require('express')

const { auth, ctrlWrapper, upload } = require('../../middlewares')

const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent))
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail))
router.post('/verify', ctrlWrapper(ctrl.emailReverify))

router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar),
)

module.exports = router
