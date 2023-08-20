const express = require('express');
const router = express.Router();
const { usersController } = require('../../controller/index');

router.post('/signup', usersController.userSignup);

router.post('/login', usersController.userLogin);

router.get('/logout', usersController.userLogout);

router.get('/current', usersController.userCurrent);

module.exports = router;