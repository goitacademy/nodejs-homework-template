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
const upload = require('../../helpers/uploads');

router.post('/signup', validateUserSignup, wrapError(ctrlUsers.signup));

router.post(
  '/login',
  loginLimit,
  validateUserLogin,
  wrapError(ctrlUsers.login),
);

router.post('/logout', guard, wrapError(ctrlUsers.logout));

router.get('/current', guard, wrapError(ctrlUsers.getCurrentUser));

router.patch(
  '/',
  guard,
  validateUserSubscriptionPatch,
  wrapError(ctrlUsers.updateSubscription),
);

router.patch(
  '/avatar',
  guard,
  upload.single('avatar'),
  wrapError(ctrlUsers.uploadAvatar),
);

module.exports = router;
