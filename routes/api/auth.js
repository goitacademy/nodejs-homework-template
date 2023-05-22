const express = require('express');
const ctrl = require('../../сontrollers/auth');
const router = express.Router();
const { validateBody, authenticate } = require('../../middlewars');
const { schemas } = require('../../models/user');
router.post('/register', validateBody(schemas.registerSchema), ctrl.register);
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);
router.get('/current', authenticate, ctrl.getCurrent);
router.post('/logout', authenticate, ctrl.logout);
router.patch(
  '/',
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);
module.exports = router;
