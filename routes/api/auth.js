const express = require('express');
const { login, logout, signup } = require('../../controllers');
const {
  validateAuth,
  validateBody,
  controlWrapper,
} = require('../../middlewares');
const {
  validationSignupUser,
  validationLoginUser,
} = require('../../service/validation');

const router = new express.Router();

// http://localhost:8083/api/auth/signup
router.post(
  '/signup',
  validateBody(validationSignupUser),
  controlWrapper(signup),
);

// http://localhost:8083/api/auth/login
router.post('/login', validateBody(validationLoginUser), controlWrapper(login));

// http://localhost:8083/api/auth/logout
router.get('/logout', validateAuth, controlWrapper(logout));

module.exports = router;
