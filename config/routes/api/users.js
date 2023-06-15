const express = require('express');
const router = express.Router();
const userController = require('../../controller/usersController');
const auth = require('../../auth/userAuth');

router.post('/signup', userController.register);

router.post('/login', userController.login);

router.get('/logout', auth, userController.logout);

router.get('/current', auth, userController.current);

router.patch('/', auth, userController.updateSubscription);

module.exports = router;
