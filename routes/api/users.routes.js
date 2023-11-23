const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users.controller');
const { auth } = require('../../middlewares/auth');
const { upload } = require('../../middlewares/upload');

router.post('/signup', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', auth, userController.logoutUser);
router.get('/current', auth, userController.currentUser);
router.patch('/:userId/subscription', auth, userController.updateSubscription);
router.patch(
	'/avatars',
	auth,
	upload.single('avatar'),
	userController.updateAvatar
);

module.exports = router;
