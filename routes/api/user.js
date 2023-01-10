const express = require('express');

const { updateSubscription } = require('../../controllers');

const { validateBody, authenticate } = require('../../middlewares');

const { userSchemas } = require('../../models');

const userRouter = express.Router();

userRouter.patch(
  '/',
  authenticate,
  validateBody(userSchemas.updateSubscriptionSchema),
  updateSubscription
);

module.exports = userRouter;
