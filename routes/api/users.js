const express = require('express');

const controllers = require('../../controllers/users');

const { validateBody, authenticate } = require('../../middlewares');

const schemas = require('../../utils/validation/userValidationSchemas');

const router = express.Router();

router.post(
  '/register',
  validateBody(schemas.registerUserSchema),
  controllers.registerUser
);

router.post(
  '/login',
  validateBody(schemas.loginUserSchema),
  controllers.loginUser
);

router.post('/logout', authenticate, controllers.logoutUser);

router.get('/current', authenticate, controllers.getCurrentUser);

router.patch(
  '/',
  authenticate,
  validateBody(schemas.updateSubscriptionUserSchema),
  controllers.updateSubscriptionUser
);

module.exports = router;
