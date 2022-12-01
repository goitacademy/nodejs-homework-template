const express = require('express');
const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate } = require('../../middlewars');
const { schemas } = require('../../models/user');
const router = express.Router();

// sign-up
router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

// sign-in
router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

// get current
router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

// logout
router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

// update user subscription
router.patch(
  '/',
  authenticate,
  validateBody(schemas.updateSubscription),
  ctrlWrapper(ctrl.updateUser)
);

module.exports = router;
