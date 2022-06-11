const express = require('express');
const { users: ctrl } = require('../../controllers');
const { auth, validation } = require('../../middlewares');
const { subscriptionJoiSchema } = require('../../models/user');

const router = express.Router();

router.get('/current', auth, ctrl.getCurrent);

router.patch(
  '/',
  auth,
  validation(subscriptionJoiSchema),
  ctrl.updateSubscription
);

module.exports = router;
