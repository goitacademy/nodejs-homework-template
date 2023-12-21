const express = require('express');
const router = express.Router();
const { validateBody } = require('../../middleware');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/auth');
const isBodyEmpty = require('../../middleware/IsBodyEmpty');
const authenticate = require('../../middleware/authenticate');

router.post(
  '/register',
  isBodyEmpty,
  validateBody(schemas.registerSchema),
  ctrl.register
);

router.post(
  '/login',
  isBodyEmpty,
  validateBody(schemas.loginSchema),
  ctrl.login
);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/', authenticate, ctrl.updateSubscription);

module.exports = router;
