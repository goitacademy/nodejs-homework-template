const express = require('express');

const { userAuthMiddlewares } = require('../../middlewares/index');
const { userController } = require('../../controllers');

const router = express.Router();

router.post('/register', userAuthMiddlewares.checkRegistrations, userController.registerUser);
router.post('/login', userAuthMiddlewares.checkLoginUserData, userController.loginUser);
router.post('/logout', userAuthMiddlewares.protect, userController.logOut);
router.get('/current', userAuthMiddlewares.protect, userController.getMy);
router.patch('/', userAuthMiddlewares.protect, userController.updateSub);
router.patch('/avatar', userAuthMiddlewares.protect, userAuthMiddlewares.uploadAvatar, userController.updateAvatar);
module.exports = router