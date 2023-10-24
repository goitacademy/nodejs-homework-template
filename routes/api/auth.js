const express = require('express');
const router = express.Router();
const { register, login, logout, getCurrentUser } = require('../../controllers/auth');
const { authenticateUser } = require('../../middlewares/authenticate');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateUser, logout);
router.get('/current', authenticateUser, getCurrentUser);

module.exports = router;
