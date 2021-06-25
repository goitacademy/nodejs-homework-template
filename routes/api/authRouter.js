const express = require('express');
const router = express.Router();

const { asyncWrapper } = require('../../helpers/asyncWrapper');

const {
  registrationController,
  loginController,
} = require('../../controllers/authenticationController');

router.post('/signup', asyncWrapper(registrationController));

router.post('/login', asyncWrapper(loginController));

module.exports = { authRouter: router };
