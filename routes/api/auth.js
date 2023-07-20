const express = require('express');

const { validateBody, authenticate, upload } = require('../../middlewars');
const { schemas } = require('../../models/user');
const controllers = require('../../controllers/auth');

const router = express.Router();

// signup
router.post(
  '/users/register',
  validateBody(schemas.registerSchema),
  controllers.register
);

// signin
router.post(
  '/users/login',
  validateBody(schemas.loginSchema),
  controllers.login
);

router.post('/users/current', authenticate, controllers.getCurrent);

router.post('/users/logout', authenticate, controllers.logout);

router.patch('/users/avatars', authenticate, upload.single("avatar"), controllers.updateAvatar);
module.exports = router;
