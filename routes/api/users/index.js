const express = require('express');
const router = express.Router();
const guard = require('../../../helpers/guard');
const upload = require('../../../helpers/upload');
const { registrationUser, loginUser } = require('./validation');
const userController = require('../../../controllers/users');
const { createAccountLimiter } = require('../../../helpers/rate-limit');

router.post(
  '/registration',
  createAccountLimiter,
  registrationUser,
  userController.reg,
);
router.post('/login', loginUser, userController.login);
router.post('/logout', guard, userController.logout);
router.patch('/subscription', guard, userController.update);
router.patch('/avatars', guard, upload.single('avatar'), () => {});

module.exports = router;
