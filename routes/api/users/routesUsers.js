const express = require('express');
const { validationWraperSchema, userUpload, guard, roleAccess, limiter } = require('../../../middlewares');
const { joiUserLoginSchema, joiUserSignUpSchema, joiUserSubscriptionSchema } = require('../../../models/user');
const { Role } = require('../../../libs');
const { UsersController } = require('../../../controllers');
const router = express.Router();

router.post(
  '/signup',
  limiter(15 * 60 * 1000, 2),
  validationWraperSchema(joiUserSignUpSchema),
  UsersController.signupUser,
);
router.post('/login', validationWraperSchema(joiUserLoginSchema), UsersController.loginUser);
router.post('/logout', guard, UsersController.logoutUser);
router.get('/stats/:id', guard, roleAccess(Role.ADMIN), UsersController.aggregation);
router.get('/current', guard, UsersController.currentUser);
router.patch(
  '/avatars',
  [guard, userUpload.single(process.env.FIELD_UPLOAD_USER_AVATAR)],
  UsersController.updateAvatar,
);
router.patch('/', [guard, validationWraperSchema(joiUserSubscriptionSchema)], UsersController.updateSubscriptionUser);

module.exports = router;
