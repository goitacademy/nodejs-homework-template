const express = require('express');

const validate = require('./validation');
const userController = require('../../../controllers/users');
const guard = require('../../../helpers/guard');
const { createAccountLimiter } = require('../../../helpers/rate-limit-reg');

const router = express.Router();

router.post(
  '/auth/register',
  createAccountLimiter,
  validate.createUser,
  userController.reg
);
router.post('/auth/login', userController.login);
router.post('/auth/logout', guard, userController.logout);
router.get('/current', userController.getCurrentUser);

module.exports = router;
