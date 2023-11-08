const express = require('express');

const ctrlUser = require('../../controllers/users');
const {
  validateBody,
  authenticate,
  validateSubscription,
  upload,
} = require('../../middlewares');
const schemas = require('../../schemas/users');

const router = express.Router();

router.post('/register', validateBody(schemas.userSchema), ctrlUser.register);

router.get('/verify/:verificationToken', ctrlUser.verifyEmail);

router.post(
  '/verify',
  validateBody(schemas.emailSchema),
  ctrlUser.resendVerifyEmail
);

router.post('/login', validateBody(schemas.userSchema), ctrlUser.login);

router.post('/logout', authenticate, ctrlUser.logout);

router.get('/current', authenticate, ctrlUser.getCurrent);

router.patch(
  '/',
  authenticate,
  validateSubscription(schemas.updateSubscriptionSchema),
  ctrlUser.updateSubscription
);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrlUser.updateAvatar
);

module.exports = router;
