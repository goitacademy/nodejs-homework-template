

const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const usersController = require('../../controllers/usersController');

router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.post('/logout', authMiddleware, usersController.logoutUser);
router.get('/current', authMiddleware, usersController.getCurrentUser);

module.exports = router;

