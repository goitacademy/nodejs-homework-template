const express = require('express');

const {
  updateSubscription,
  updateAvatar,
  verifyEmail,
  sendVerificationMail,
} = require('../../controllers');

const { validateBody, authenticate, upload } = require('../../middlewares');

const { userSchemas } = require('../../models');

const userRouter = express.Router();

userRouter.patch(
  '/',
  authenticate,
  validateBody(userSchemas.updateSubscriptionSchema),
  updateSubscription
);

userRouter.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  updateAvatar
);

userRouter.get('/verify/:verificationToken', verifyEmail);

userRouter.post(
  '/verify',
  validateBody(userSchemas.sendVerificationEmailSchema),
  sendVerificationMail
);

module.exports = userRouter;
