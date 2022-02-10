const express = require('express');
const router = express.Router();

const { authenticate } = require('../../middlewares');

const {
    signUp,
    login,
    logout,
    current
} = require('../../controllers').user;

router.post('/signup', signUp)

router.post('/login', login)

router.get('/current', authenticate, current)

router.get('/logout', authenticate, logout)

module.exports = router;
