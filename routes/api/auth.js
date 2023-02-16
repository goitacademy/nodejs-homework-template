const express = require('express');

const routerAuth = express.Router();

const { auth: ctrl } = require('../../controllers/index');
const {
  userRegisterValidation,
  userLoginValidation,
  auth,
} = require('../../middlewares/index');

routerAuth.post('/register', userRegisterValidation, ctrl.register);

routerAuth.post('/login', userLoginValidation, ctrl.login);

routerAuth.get('/logout', auth, ctrl.logout);

module.exports = routerAuth;
