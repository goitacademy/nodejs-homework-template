const express = require('express');
const router = express.Router();

const { authenticate, upload } = require('../../middlewares');
const { ControllersHelper } = require('../../helpers');
const ctrl = require('../../controllers/auth');

router.post('/registration', ControllersHelper(ctrl.registration));

router.get('/verify/:verificationCode', ControllersHelper(ctrl.verify));

router.post('/verify', ControllersHelper(ctrl.resendVerify));

router.post('/login', ControllersHelper(ctrl.login));

router.get('/current', authenticate, ControllersHelper(ctrl.getCurrent));

router.post('/logout', authenticate, ControllersHelper(ctrl.logout));

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ControllersHelper(ctrl.updateAvatar)
);

module.exports = router;
