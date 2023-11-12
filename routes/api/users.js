const express = require('express');
const {
  register,
  login,
  logout,
  refresh,
  updateSubscription,
} = require('../../controllers/users');
const validateBody = require('../../middlewares/validateBody');
const {
  registerSchema,
  loginSchema,
  updateSubscriptionUserSchema,
} = require('../../models/user');
const { authenticate } = require('../../middlewares');

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);

router.post('/login', validateBody(loginSchema), login);

router.post('/logout', authenticate, logout);

router.get('/current', authenticate, refresh);

router.patch(
  '/',
  authenticate,
  validateBody(updateSubscriptionUserSchema),
  updateSubscription
);

module.exports = router;
