const express = require('express');

const { authorization, validation, upload } = require('../../middlewares');
const { joiUserSchema, joiSubscriptionSchema } = require('../../models/user');
const { ctrlWrapper } = require('../../helpers');
const controllers = require('../../controllers/users');

const router = express.Router();

router.post(
  '/signup',
  validation(joiUserSchema),
  ctrlWrapper(controllers.signup)
);

router.post(
  '/login',
  validation(joiUserSchema),
  ctrlWrapper(controllers.login)
);

router.post('/logout', authorization, ctrlWrapper(controllers.logout));

router.get('/current', authorization, ctrlWrapper(controllers.getCurrent));

router.patch(
  '/:id/subscription',
  validation(joiSubscriptionSchema),
  ctrlWrapper(controllers.updateSubscription)
);

router.patch(
  '/avatars',
  authorization,
  upload.single('avatar'),
  ctrlWrapper(controllers.updateAvatar)
);

module.exports = router;
