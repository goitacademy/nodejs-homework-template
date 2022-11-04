const express = require('express');

const router = express.Router();

const {
  validateBody,
  ctrlWrapper,
  authenticate,
  upload,
} = require('../../middlewares');
const { contactsControllers: ctrl } = require('../../controllers');
const { schemas } = require('../../models/user');

router.post(
  '/signup',
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify));

router.post(
  '/verify',
  validateBody(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.resendEmail)
);

router.post(
  '/login',
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));
router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
