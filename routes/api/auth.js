const express = require('express');
const { registration, login } = require('../../controllers/auth');
const { tryCatchWrapper } = require('../../helpers');
const { userValidation } = require('../../validation/schemas/user');

const authRouter = express.Router();

authRouter.post('/register', userValidation, tryCatchWrapper(registration));
authRouter.get('/login', userValidation, tryCatchWrapper(login));

module.exports = authRouter;
