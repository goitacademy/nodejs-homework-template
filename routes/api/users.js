const express = require('express');
const { current, subscription } = require('../../controllers');
const {
  validateAuth,
  validateBody,
  validateParams,
  controlWrapper,
} = require('../../middlewares');
const {
  validationUserId,
  validationUpdateSubscription,
} = require('../../service/validation');

const router = new express.Router();

router.get('/current', validateAuth, controlWrapper(current));

router.patch(
  '/:userId/subscription',
  [
    validateBody(validationUpdateSubscription),
    validateParams(validationUserId),
  ],
  controlWrapper(subscription),
);

module.exports = router;
