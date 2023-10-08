const express = require('express');

const {
  validateBody,
  authenticate,
  isValidId,
  upload,
} = require('../../middlewares');

const {
  registerSchema,
  emailSchema,
  loginSchema,
  updateSubscriptionSchema,
} = require('../../schemas/');

const {
  users: {
    register,
    verifyEmail,
    resendVerifyEmail,
    login,
    getCurrent,
    logout,
    updateSubscription,
    updateAvatar,
  },
} = require('../../controllers');

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);

router.post('/verify', validateBody(emailSchema), resendVerifyEmail);

router.get('/verify/:verificationToken', verifyEmail);

router.post('/login', validateBody(loginSchema), login);

router.get('/current', authenticate, getCurrent);

router.post('/logout', authenticate, logout);

router.patch(
  '/:id/subscription',
  authenticate,
  isValidId,
  validateBody(updateSubscriptionSchema),
  updateSubscription
);

router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

module.exports = router;
