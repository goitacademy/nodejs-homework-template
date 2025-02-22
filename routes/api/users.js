const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const authMiddleware = require('../../middleware/authMiddleware');
const { uploadMiddleware, updateAvatar } = require('../../controllers/usersController');

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.get('/current', authMiddleware, usersController.getCurrent);
router.patch('/avatars', authMiddleware, uploadMiddleware, updateAvatar);

module.exports = router;