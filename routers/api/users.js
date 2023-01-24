const express = require('express');
const {
  registration,
  login,
  currentUser,
  logout,
  updateSubscription,
  changeAvatar,
} = require('../../controllers/users');
const { tryCatchWrapper } = require('../../helpers');
const { authorization, upload } = require('../../middleware');
const { userValidation } = require('../../validation/user');

const usersRouter = express.Router();

usersRouter.post('/register', userValidation, tryCatchWrapper(registration));
usersRouter.get('/login', userValidation, tryCatchWrapper(login));
usersRouter.get('/current', tryCatchWrapper(authorization), tryCatchWrapper(currentUser));
usersRouter.post('/logout', tryCatchWrapper(authorization), tryCatchWrapper(logout));
usersRouter.patch('/', tryCatchWrapper(authorization), tryCatchWrapper(updateSubscription));
usersRouter.patch(
  '/avatar',
  tryCatchWrapper(authorization),
  upload.single('avatar'),
  tryCatchWrapper(changeAvatar)
);

module.exports = usersRouter;
