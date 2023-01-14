const express = require('express');

const {
  authMiddleware,
  validation,
  controllerWrapper,
} = require('../../Middlewares');
const { joiSubscriptionSchema } = require('../../Schema/joiAuthSchema');
const { users: ctrl } = require('../../Controllers');

const router = express.Router();

router.get('/current', authMiddleware, controllerWrapper(ctrl.getCurrent));

router.patch(
  '/',
  authMiddleware,
  validation(joiSubscriptionSchema),
  controllerWrapper(ctrl.updateSubscription),
);

module.exports = router;
