const express = require('express');
const authController = require('../../controllers/users/authController');
const currentUserContactsController = require('../../controllers/users/currentUserContactsController');

const validation = require('../../middlewares/validation');
const tryCatchMiddleware = require('../../middlewares/tryCatchMiddleware');
const auth = require('../../middlewares/auth');
const { joiUser } = require('../../models/user');

const router = express.Router();

router.post(
  '/signup',
  validation(joiUser),
  tryCatchMiddleware(authController.signup),
);

router.post(
  '/login',
  validation(joiUser),
  tryCatchMiddleware(authController.login),
);

router.get('/logout', auth, tryCatchMiddleware(authController.logout));

router.get(
  '/current',
  auth,
  tryCatchMiddleware(currentUserContactsController.getCurrent),
);

module.exports = router;
