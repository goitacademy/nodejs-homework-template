const express = require('express');
const ctrl = require('../../controllers/auth');
const { validateBody, authenticate } = require('../../middlewares');
const { registerSchema, loginSchema, updateSubscriptionSchema } = require('../../models/user');
const router = express.Router();

router.post('/register', validateBody(registerSchema), ctrl.register);

router.post('/login', validateBody(loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch(
  '/subscription',
  authenticate,
  validateBody(updateSubscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
