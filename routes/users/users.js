const express = require('express');
const router = express.Router();

const ctrlUsers = require('../../controllers/users');

router.post('/signup', ctrlUsers.signup);

router.post('/login', ctrlUsers.login);

router.post('/logout', ctrlUsers.logout);

module.exports = router;
