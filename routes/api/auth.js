const express = require('express');
const { validateBody, authenticate } = require('../../middlewars');
const { ctrlWrapper } = require('../../helpers');
const { schemas } = require('../../models/user');

const ctrl = require('../../controllers/auth');

const router = express.Router();

// signUp
router.post(
  '/signup',
  validateBody(schemas.signupSchema),
  ctrlWrapper(ctrl.signup)
);

//signIn
router.post(
  '/login',
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

//subscription
router.patch(
  '/users',
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrlWrapper(ctrl.subscription)
);

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
