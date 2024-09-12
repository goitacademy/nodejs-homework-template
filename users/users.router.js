const express = require('express');
const usersController = require('./users.controller');
const { validateUserMiddleware } = require('./users.validators');
const { authMiddleware } = require('../auth/auth.middleware');
const usersRouter = express.Router();

// usersRouter.post('/signup', validateUserMiddleware, usersController.signUpHandler);
// usersRouter.post('/login', validateUserMiddleware, usersController.loginHandler);
usersRouter.post('/signup', usersController.signUpHandler);
usersRouter.post('/login', usersController.loginHandler);
usersRouter.post('/logout', authMiddleware, usersController.logoutHandler);
usersRouter.get('/current', authMiddleware, usersController.currentHandler);
usersRouter.get('/secret', authMiddleware, (req, res) => res.status(200).send({ message: 'Hello from secret area!'}));

module.exports = usersRouter;