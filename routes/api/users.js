const express = require('express');

const { auth, upload, ctrlWrapper } = require('../../middlewares');

const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/verify', ctrlWrapper(ctrl.verify));

router.patch('/', auth, ctrlWrapper(ctrl.updateSubscription));

router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));

module.exports = router;