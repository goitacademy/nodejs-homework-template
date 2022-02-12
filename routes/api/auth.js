const express = require('express');
const router = express.Router();

const { authenticate, upload } = require('../../middlewares');

const {
    signUp,
    login,
    logout,
    current,
    avatars
} = require('../../controllers').user;

router.post('/signup', signUp)

router.post('/login', login)

router.get('/current', authenticate, current)

router.get('/logout', authenticate, logout)

router.patch('/avatars', authenticate, upload.single('avatar'), avatars)

module.exports = router;
