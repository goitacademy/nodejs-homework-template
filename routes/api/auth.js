const express = require('express');
const { registration } = require('../../controllers/auth');
const { userValidation } = require('../../validation/schemas/user');

const authRouter = express.Router();

authRouter.post('/register', userValidation, registration);

module.exports = authRouter;
