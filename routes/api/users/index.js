const express = require('express');
const router = express.Router();
const guard = require('../../../helpers/guard');
const validate = require('./validation');
const { createAccountLimiter } = require('../../../helpers/rate-limit-reg');

const userController = require('../../../controllers/users');

router.post(
  '/auth/register',
  createAccountLimiter,
  validate.reg,
  userController.reg,
);
router.post('/auth/login', validate.login, userController.login);
router.post('/auth/logout', guard, userController.logout);
router.get('/current', guard, userController.current);

module.exports = router;
