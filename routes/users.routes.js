const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const Auth = require('../middlewares/auth');
const upload = require('../middlewares/uploadAvatar');

router.post('/users/signup', userController.signUp);

router.post('/users/login', userController.logIn);

router.post('/users/logout', Auth, userController.logOut);

router.get('/users/current', Auth, userController.currentUser);

router.patch('/avatars', Auth, upload.single("avatar"), userController.updateAvatar);

module.exports = router;
