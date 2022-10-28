const express = require('express');
const ctrl = require('../../controllers/authControllers');
const { authorizationMiddleware, upload } = require('../../middleware');
const { authValidation } = require('../../validation');

const router = express.Router();

router.post('/register', authValidation, ctrl.registeration);

router.post('/login', authValidation, ctrl.login);

router.post('/current', authorizationMiddleware, ctrl.getCurrent);

router.post('/logout', authorizationMiddleware, ctrl.logout);

router.patch(
  '/avatars',
  authorizationMiddleware,
  upload.single('avatar'),
  ctrl.patchAvatar
);

module.exports = router;
