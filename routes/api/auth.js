const express = require('express');

const { register, login, getCurrent, logout, updateSubscriptionStatus } = require('../../controllers/auth');
const { authenticate } = require('../../middlewares');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current', authenticate, getCurrent);
router.post('/logout', authenticate, logout);
router.patch('/:userId', authenticate, updateSubscriptionStatus);

module.exports = router;
