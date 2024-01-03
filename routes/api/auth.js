const express = require('express');
const router = express.Router();
const {
  validateBody,
  isBodyEmpty,
  authenticate,
  upload,
} = require('../../middleware');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/auth');

router.post(
  '/register',
  isBodyEmpty,
  validateBody(schemas.registerSchema),
  ctrl.register
);

router.post(
  '/login',
  isBodyEmpty,
  validateBody(schemas.loginSchema),
  ctrl.login
);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/', authenticate, ctrl.updateSubscription);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrl.updateAvatar
);

module.exports = router;
