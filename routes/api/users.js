const express = require('express');
const router = express.Router();
const userController = require('../../Controllers/usersController');
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', authMiddleware, userController.logoutUser);
router.get('/current', authMiddleware, userController.getCurrentUser);

module.exports = router;
