const express = require('express');

const authRouter = express.Router();

const ctrl = require('../controllers/auth');
const { validateBody } = require('../middleware');
const isTokenValid = require('../middleware/isTokenValid');
const { userSchemas } = require('../models/users');

authRouter.post('/register', validateBody(userSchemas.registerUser), ctrl.register);

authRouter.post('/login', validateBody(userSchemas.loginUser), ctrl.login);

authRouter.post('/logout', isTokenValid, ctrl.logout);

authRouter.get('/current', isTokenValid, ctrl.current);

authRouter.patch('/subscription', validateBody(userSchemas.updateSubscription), isTokenValid, ctrl.updateSubscription);

module.exports = authRouter;