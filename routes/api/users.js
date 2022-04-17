const express = require('express');
const { current, subscription, avatar } = require('../../controllers');
const {
  validateAuth,
  validateBody,
  controlWrapper,
  validateUpload,
} = require('../../middlewares');
const { validationUpdateSubscription } = require('../../service/validation');

const router = new express.Router();

// http://localhost:8083/api/users/current
router.get('/current', validateAuth, controlWrapper(current));

// http://localhost:8083/api/users/avatars
router.patch(
  '/avatars',
  [validateAuth, validateUpload.single('avatar')],
  avatar,
);

// http://localhost:8083/api/users/subscription
router.patch(
  '/subscription',
  [validateAuth, validateBody(validationUpdateSubscription)],
  controlWrapper(subscription),
);

module.exports = router;
