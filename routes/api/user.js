const express = require('express');
const router = express.Router();

const UsersController = require('../../controllers/user');
const { createBodyValidator, authenticate } = require('../../middleware/middleware');
const upload = require('../../middleware/upload');
const { schemas } = require('../../models/userSchema');

router.post(
  '/register',
  createBodyValidator(schemas.schema),
  UsersController.register
);

router.post(
  '/login',
  createBodyValidator(schemas.schema),
  UsersController.login
);

router.post('/logout', authenticate, UsersController.logout);

router.get('/current', authenticate, UsersController.current);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  UsersController.updateAvatar
);

module.exports = router;