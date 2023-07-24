const express = require('express');

const {
    register,
    login,
    getCurrent,
    logout,
    updateSubscriptionStatus,
    updateAvatar,
    verifyEmail,
    resendVerifyEmail,
} = require('../../controllers/auth');
const { authenticate, upload } = require('../../middlewares');

const router = express.Router();

router.post('/register', register);
router.get('/verify/:verificationToken', verifyEmail);
router.post('/verify', resendVerifyEmail);

router.post('/login', login);
router.get('/current', authenticate, getCurrent);
router.post('/logout', authenticate, logout);
router.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);
router.patch('/:userId', authenticate, updateSubscriptionStatus);

module.exports = router;
