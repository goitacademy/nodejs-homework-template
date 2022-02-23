const express = require('express');
const router = express.Router();

const { authenticate, upload } = require('../../middlewares');

const {
    signUp,
    login,
    logout,
    current,
    avatars,
    verify,
    reVerify
} = require('../../controllers').user;

router.get('/verify/:verificationToken', verify)

router.post('/verify/:verificationToken', reVerify)

router.post('/signup', signUp)

router.post('/login', login)

router.get('/current', authenticate, current)

router.get('/logout', authenticate, logout)

router.patch('/avatars', authenticate, upload.single('avatar'), avatars)

module.exports = router;
