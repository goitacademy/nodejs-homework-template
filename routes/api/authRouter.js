const express = require('express');
const router = express.Router();

const { asyncWrapper } = require('../../helpers/asyncWrapper');

const {
  registrationController,
  loginController,
  logoutController,
} = require('../../controllers/authenticationController');

router.post('/signup', asyncWrapper(registrationController));

router.post('/login', asyncWrapper(loginController));

router.post('/logout', asyncWrapper(logoutController));

module.exports = { authRouter: router };
