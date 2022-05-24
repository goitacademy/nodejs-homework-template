const express = require('express');
const authController = require('../../controllers/users/authController');
const currentUserController = require('../../controllers/users/currentUserController');

const validation = require('../../middlewares/validation');
const tryCatchMiddleware = require('../../middlewares/tryCatchMiddleware');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');
const { joiUser, joiSubscribtion } = require('../../models/user');

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
  tryCatchMiddleware(currentUserController.getCurrent),
);

router.patch(
  '/',
  auth,
  validation(joiSubscribtion),
  tryCatchMiddleware(currentUserController.updateSubscription),
);

router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  tryCatchMiddleware(currentUserController.updateAvatar),
);

module.exports = router;
