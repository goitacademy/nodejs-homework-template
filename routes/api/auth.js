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

router.post(
  '/signup',
  validateBody(validationSignupUser),
  controlWrapper(signup),
);

router.post('/login', validateBody(validationLoginUser), controlWrapper(login));

router.get('/logout', validateAuth, controlWrapper(logout));

module.exports = router;
