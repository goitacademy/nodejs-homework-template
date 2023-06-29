const express = require('express');
const authController = require('../../controllers/auth-controller');

const authRouter = express.Router();

const { validateBody } = require('../../decoraters/validateBody');

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
