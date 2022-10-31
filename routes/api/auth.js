const express = require('express');

const router = express.Router();
/** liba for work with files */

/**
 * our functions which one is responsible for operations with data depending on the route
 */
const ctrl = require('../../controlers/auth');

/** in this wrapper  I took out try catch.  */
const { ctrlWrapper } = require('../../helpers');

/** Schemas joi  */
const { Schemas } = require('../../models/user');

/** in this function I took out validation body of request */
const { validateBody, authenticate, upload } = require('../../middlewares');

/** register path */
router.post(
  '/register',

  validateBody(Schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

/** login path */
router.post(
  '/login',
  validateBody(Schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get(
  '/current',
  authenticate,
  // validateBody(Schemas.registerSchema),
  ctrlWrapper(ctrl.getCurrent)
);

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  '/',
  authenticate,
  validateBody(Schemas.subscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

/**
 * router for change avatar
 */
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar') /** can be ([...]) */,
  ctrlWrapper(ctrl.updateAvatar)
);

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify));

router.post(
  '/verify/',
  validateBody(Schemas.emailSchema),
  ctrlWrapper(ctrl.resendVerify)
);

module.exports = router;
