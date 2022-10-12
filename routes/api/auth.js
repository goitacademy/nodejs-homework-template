const express = require('express');

const ctrl = require('../../controllers/auth');

const { ctrlWrapper } = require('../../helpers');

const { validateBody, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/users');

const router = express.Router();

router.post(
  '/users/register',
  validateBody(schemas.userRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  '/users/login',
  validateBody(schemas.userLoginSchema),
  ctrlWrapper(ctrl.login)
);

router.get('/users/current', authenticate, ctrlWrapper(ctrl.getCurrent));
router.get('/users/logout', authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  '/users',
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrlWrapper(ctrl.upDateSubscription)
);

module.exports = router;
