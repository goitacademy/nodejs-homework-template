const express = require('express');
const router = express.Router();

const {
  validation,
  ctrlWrapper,
  authenticate,
  upload,
} = require('../../middlewares');
const { schemas } = require('../../models/user');
const { users: ctrl } = require('../../controllers');

router.post(
  '/signup',
  validation(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.get(
  '/verify/:verificationCode',
  ctrlWrapper(ctrl.verify)
);

router.post(
  '/verify/',
  validation(schemas.emailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.post(
  '/login',
  validation(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get(
  '/current',
  authenticate,
  ctrlWrapper(ctrl.getCurrent)
);

router.get(
  '/logout',
  authenticate,
  ctrlWrapper(ctrl.logout)
);

router.patch(
  '/',
  authenticate,
  validation(schemas.updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
