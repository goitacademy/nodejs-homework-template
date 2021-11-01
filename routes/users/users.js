const express = require('express');
const router = express.Router();

const ctrlUsers = require('../../controllers/users');
const guard = require('../../helpers/guard');

router.post('/signup', ctrlUsers.signup);

router.post('/login', ctrlUsers.login);

router.post('/logout', guard, ctrlUsers.logout);

module.exports = router;
