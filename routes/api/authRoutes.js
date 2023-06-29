const express = require('express');
const router = express.Router();
const { signup, login, logout, getCurrent, changeUserSubscription } = require('../../controllers/index');
const authenticate = require('../../middlewares/authMiddleware');

router.post('/register', signup);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/current', authenticate, getCurrent);
router.patch('/',  authenticate, changeUserSubscription);

module.exports = router 