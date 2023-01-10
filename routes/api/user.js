const express = require('express');

const { updateSubscription, updateAvatar } = require('../../controllers');

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

module.exports = userRouter;
