const express = require('express');

const { signUp, login, logout, getCurrent } = require('../../controllers');

const { validateBody, authenticate } = require('../../middlewares');

const { userSchemas } = require('../../models');

const authRouter = express.Router();

authRouter.post('/signup', validateBody(userSchemas.registerSchema), signUp);

authRouter.post('/login', validateBody(userSchemas.loginSchema), login);

authRouter.post('/logout', authenticate, logout);

authRouter.get('/current', authenticate, getCurrent);

module.exports = authRouter;
