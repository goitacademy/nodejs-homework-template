const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const Auth = require('../middlewares/auth')

router.post('/signup', userController.signUp);

router.post('/login', userController.logIn);

router.post('/logout', Auth, userController.logOut);

router.get('/current', Auth, userController.currentUser);

module.exports = router;
