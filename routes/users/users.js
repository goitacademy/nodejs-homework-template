const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  logout,
  current,
  patchUser,
} = require('../../controllers/controllerUser');
const {
  validateUser,
  validateUsersPatch,
} = require('../../validation/validationUser');

const guard = require('../../helpers/guard');
const loginLimit = require('../../helpers/rote-limit-login');

router.post('/signup', validateUser, signup);
router.post('/login', loginLimit, validateUser, login);
router.post('/logout', guard, logout);
router.get('/current', guard, current);
router.patch('/', guard, validateUsersPatch, patchUser);

module.exports = router;
