const express = require('express');

const {
  controllerWrapper,
  authenticate,
  upload,
} = require('../../middlewares');

const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/verify/:verifyToken', controllerWrapper(ctrl.verify));

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  controllerWrapper(ctrl.updateAvatar)
);

module.exports = router;
