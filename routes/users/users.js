const express = require('express');
const router = express.Router();

const ctrlUsers = require('../../controllers/users');
const guard = require('../../helpers/guard');
const loginLimit = require('../../helpers/rate-limit-login');

router.post('/signup', ctrlUsers.signup);

router.post('/login', loginLimit, ctrlUsers.login);

router.post('/logout', guard, ctrlUsers.logout);

module.exports = router;
