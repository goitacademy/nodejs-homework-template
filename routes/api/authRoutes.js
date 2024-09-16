const express = require('express');
const router = express.Router();
const { signup, login, logout, getCurrent, changeUserSubscription, changeAvatarImg, verificationEmail, reVerificationEmail } = require('../../controllers/index');
const authenticate = require('../../middlewares/authMiddleware');
const upload = require('../../middlewares/uploadMiddleware');
const sendgrigMail = require('../../helpers/sendgridMail');

router.post('/register', signup);
router.post('/verify', reVerificationEmail);
router.get('/verify/:verificationToken', verificationEmail);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/current', authenticate, getCurrent);
router.patch('/', authenticate, changeUserSubscription);
router.patch('/avatars', authenticate, upload.single("avatar"), changeAvatarImg);

module.exports = router 