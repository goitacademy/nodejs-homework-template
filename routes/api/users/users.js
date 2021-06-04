const express = require('express');
const router = express.Router();
const { validationNewUser } = require('./validation');
const Controllers = require('../../../controllers/users-controllers');

router.post('/signup', validationNewUser, Controllers.signup);
router.post('/login', Controllers.login);
router.post('/logout', Controllers.logout);

module.exports = router;
