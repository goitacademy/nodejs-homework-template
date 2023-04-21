const express = require('express');
const { users: controller } = require('../../controllers');
const router = express.Router();
const { validation, auth, upload, ctrlWrapper } = require('../../middlewares');
const { passwordJoiSchema, loginJoiSchema } = require('../../models/users');

router.get('/current', auth, controller.getCurrent);

router.get('/logout', auth, controller.logout);

router.post(
  '/signup',
  validation(passwordJoiSchema),
  ctrlWrapper(controller.signup)
);

router.post(
  '/login',
  validation(loginJoiSchema),
  ctrlWrapper(controller.login)
);

router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  ctrlWrapper(controller.updateAvatar)
);

module.exports = router;
