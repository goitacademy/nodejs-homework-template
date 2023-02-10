const express = require('express');
const router = express.Router();
const usersController = require('../../controller/usersController');

router.post('/signup', usersController.register);

module.exports = router;
