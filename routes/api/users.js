const express = require('express');
const {
  registration,
  login,
  currentUser,
  logout,
  updateSubscription,
} = require('../../controllers/users');
const { tryCatchWrapper } = require('../../helpers');
const { authorization } = require('../../middleware');
const { userValidation } = require('../../validation/schemas/user');

const usersRouter = express.Router();

usersRouter.post('/register', userValidation, tryCatchWrapper(registration));
usersRouter.get('/login', userValidation, tryCatchWrapper(login));
usersRouter.get('/current', tryCatchWrapper(authorization), tryCatchWrapper(currentUser));
usersRouter.post('/logout', tryCatchWrapper(authorization), tryCatchWrapper(logout));
usersRouter.patch('/', tryCatchWrapper(authorization), tryCatchWrapper(updateSubscription));

module.exports = usersRouter;
