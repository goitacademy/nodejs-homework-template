const express = require('express');
const router = express.Router();
const { signup, login, logout, getCurrent, changeUserSubscription, changeAvatarImg } = require('../../controllers/index');
const authenticate = require('../../middlewares/authMiddleware');
const upload = require('../../middlewares/uploadMiddleware');

router.post('/register', signup);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.post('/current', authenticate, getCurrent);
router.patch('/', authenticate, changeUserSubscription);
router.patch('/avatars', authenticate, upload.single("avatar"), changeAvatarImg);

module.exports = router 