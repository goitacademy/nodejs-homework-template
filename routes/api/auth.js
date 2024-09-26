const express = require('express');

const { validateBody, authenticate, isValidId } = require('../../middlewares');

const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
} = require('../../schemas/');

const {
  users: { register, login, getCurrent, logout, updateSubscription },
} = require('../../controllers');

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);

router.post('/login', validateBody(loginSchema), login);

router.get('/current', authenticate, getCurrent);

router.post('/logout', authenticate, logout);

router.patch(
  '/:id/subscription',
  authenticate,
  isValidId,
  validateBody(updateSubscriptionSchema),
  updateSubscription
);

module.exports = router;
