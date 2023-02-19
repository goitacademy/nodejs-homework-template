const express = require('express');
const router = express.Router();
const userController = require('../../controller/usersController');
const auth = require('../../middlewares/userAuth');
const { avatarUpload } = require('../../middlewares/avatarsUpload');

router.post('/signup', userController.register);

router.post('/login', userController.login);

router.get('/logout', auth, userController.logout);

router.get('/current', auth, userController.current);

router.patch('/', auth, userController.updateSubscription);

router.get('/verify/:verificationToken', userController.verifyToken);

router.post('/verify', userController.sendVerification);

router.patch(
  '/avatars',
  auth,
  avatarUpload.single('avatar'),
  userController.updateAvatar
);

module.exports = router;
