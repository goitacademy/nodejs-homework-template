const express = require('express');

const { validateBody, authenticate } = require('../../middlewars');
const { schemas } = require('../../models/user');
const controllers = require('../../controllers/auth');
const logout = require('../../controllers/auth/logout');

const router = express.Router();

// console.log(controllers.logout)

// signup
router.post(
  '/users/register',
  validateBody(schemas.registerSchema),
  controllers.register
);

// signin
router.post(
  '/users/login',
  validateBody(schemas.loginSchema),
  controllers.login
);

router.post('/users/current', authenticate, controllers.getCurrent);

router.post('/users/logout', authenticate, controllers.logout);

module.exports = router;
