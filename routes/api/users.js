const express = require('express');
const router = express.Router();
const usersController = require('../../controller/usersController');

router.post('/signup', usersController.register);

router.post('/login', usersController.login);

module.exports = router;
