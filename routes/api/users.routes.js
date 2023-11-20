const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users.controller');
const { auth } = require('../../authorization/auth');

router.post('/signup', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', auth, userController.logoutUser);
router.get('/current', auth, userController.currentUser);
router.patch('/:userId/subscription', auth, userController.updateSubscription);

module.exports = router;
