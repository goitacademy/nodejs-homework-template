const express = require('express');
const router = express.Router();

const ctrlUsers = require('../../controllers/users');
const {
  validateUserSignup,
  validateUserLogin,
  validateUserSubscriptionPatch,
} = require('./validation');

const guard = require('../../helpers/guard');
const loginLimit = require('../../helpers/rate-limit-login');
const wrapError = require('../../helpers/errorHandles');

router.post('/signup', validateUserSignup, wrapError(ctrlUsers.signup));

router.post(
  '/login',
  loginLimit,
  validateUserLogin,
  wrapError(ctrlUsers.login),
);

router.post(
  '/logout',
  guard,
  validateUserSubscriptionPatch,
  wrapError(ctrlUsers.logout),
);

module.exports = router;
