const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const { register, login, logout, upSubscription } = require('../../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/register', tryCatchWrapper(register));
authRouter.post('/login', tryCatchWrapper(login));
authRouter.post('/logout', tryCatchWrapper(logout));
authRouter.patch('/', tryCatchWrapper(upSubscription));

module.exports = {
  authRouter,
};
