const express = require('express');
const { validationWraperSchema, userUpload, guard, roleAccess, limiter } = require('../../../middlewares');
const {
  joiUserLoginSchema,
  joiUserSignUpSchema,
  joiUserSubscriptionSchema,
  joiUserVerifyEmailSchema,
} = require('../../../models/user');
const { Role } = require('../../../libs');
const { usersController } = require('../../../controllers');
const router = express.Router();

router.post(
  '/signup',
  limiter(15 * 60 * 1000, 2),
  validationWraperSchema(joiUserSignUpSchema),
  usersController.signupUser,
);
router.post('/login', validationWraperSchema(joiUserLoginSchema), usersController.loginUser);
router.post('/logout', guard, usersController.logoutUser);
router.get('/stats/:id', guard, roleAccess(Role.ADMIN), usersController.aggregation);
router.get('/current', guard, usersController.currentUser);
router.get('/verify/:token', usersController.verificationUser);
router.post(
  '/verify',
  validationWraperSchema(joiUserVerifyEmailSchema),
  usersController.repeatEmailForVerificationUser,
);
router.patch(
  '/avatars',
  [guard, userUpload.single(process.env.FIELD_UPLOAD_USER_AVATAR)],
  usersController.updateAvatar,
);
router.patch('/', [guard, validationWraperSchema(joiUserSubscriptionSchema)], usersController.updateSubscriptionUser);

module.exports = router;
