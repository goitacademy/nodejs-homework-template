const express = require('express');

const { signup, login, logout, currentUser, verifyEmail, resendVerificationEmail, updateAvatar } = require('../../controllers/auth');

const auth = require('../../middleware/auth');
const upload = require('../../middleware/uploads');

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/logout', auth, logout);

router.get('/current', auth, currentUser);


router.get('/verify/:verificationToken', verifyEmail);

router.post('/verify', resendVerificationEmail);

router.patch('/avatars', auth, upload.single('avatar'), updateAvatar);


module.exports = router;
