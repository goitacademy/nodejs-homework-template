const express = require('express');
const authController = require('../../controllers/auth-controller');

const authRouter = express.Router();

const { validateBody } = require('../../decoraters/validateBody');
const { authenticate } = require('../../middlewares');

const userSchemas = require('../../schemas/user-schemes');
module.exports = authRouter;

authRouter.post(
  '/users/register',
  validateBody(userSchemas.userRegisterSchema),
  authController.signup
);

authRouter.post(
  '/users/login',
  validateBody(userSchemas.userLogInSchema),
  authController.signIn
);

authRouter.get('/users/current', authenticate, authController.getCurrent);

authRouter.post('/users/logout', authenticate, authController.logout);
