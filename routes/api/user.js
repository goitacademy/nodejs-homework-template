const express = require('express');

const { userAuthMiddlewares } = require('../../middlewares/index');
const { userController } = require('../../controllers');

const router = express.Router();

router.post('/register', userAuthMiddlewares.checkRegistrations, userController.registerUser);
router.post('/login', userAuthMiddlewares.checkLoginUserData, userController.loginUser);
router.post('/verify', userAuthMiddlewares.checkUserEmail, userController.repiedSendVerifyToken);

router.post('/logout', userAuthMiddlewares.protect, userController.logOut);
router.get('/current', userAuthMiddlewares.protect, userController.getMy);
router.patch('/', userAuthMiddlewares.protect, userAuthMiddlewares.checkSubscription, userController.updateSub);
router.patch('/avatars', userAuthMiddlewares.protect, userAuthMiddlewares.uploadAvatar, userController.updateAvatar);

router.patch('/update-my-password', userAuthMiddlewares.protect, userAuthMiddlewares.checkUpdateMyPassword, userController.updateMyPassword,);
router.post('/forgot-password', userAuthMiddlewares.checkUserEmail, userController.forgotPassword);
router.post('/reset-password/:otp', userAuthMiddlewares.checkNewPassword, userController.resetPassword);

router.get('/verify/:verificationToken', userController.verifyToken);

module.exports = router