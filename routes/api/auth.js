const { Router } = require('express');

const { schemas } = require('../../models/user');
const { validateBody } = require('../../decorators');
const AuthController = require('../../controllers/auth-controller');
const { authenticate } = require('../../middlewares');

const router = Router();

router.post('/register', validateBody(schemas.registerSchema), AuthController.register);

router.post('/login', validateBody(schemas.loginSchema), AuthController.login);

router.get('/current', authenticate, AuthController.getCurrent);

router.post('/logout', authenticate, AuthController.logout);

router.patch(
  '/users',
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  AuthController.updateSubscription
);

module.exports = router;