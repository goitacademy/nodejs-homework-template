const express = require('express');
const { validation, userAuthorization, userUpload } = require('../../middlewares');
const { joiUserLoginSchema, joiUserSignUpSchema, joiUserSubscriptionSchema } = require('../../models/user');

const { usersController } = require('../../controllers');
const router = express.Router();

router.post('/signup', validation(joiUserSignUpSchema), usersController.signupUser);
router.post('/login', validation(joiUserLoginSchema), usersController.loginUser);
router.post('/logout', userAuthorization, usersController.logoutUser);
router.get('/current', userAuthorization, usersController.currentUser);
router.patch('/avatars', userAuthorization, userUpload.single('avatar'), usersController.updateAvatar);
router.patch('/', userAuthorization, validation(joiUserSubscriptionSchema), usersController.updateSubscriptionUser);

module.exports = router;
