const express = require('express');
const router = express.Router();
const { usersController } = require('../../controller');
const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');

router.post('/signup', usersController.userSignup);

router.post('/login', usersController.userLogin);

router.get('/logout', auth, usersController.userLogout);

router.get('/current', auth, usersController.userCurrent);

router.patch('/', auth, usersController.userUpdateSubscription);

router.patch('/avatars', auth, upload.single('avatar'), usersController.userUpdateAvatar);

router.get('/verify/:verificationToken', usersController.userVerification);

router.post('/verify', usersController.userVerificationResend);

module.exports = router;