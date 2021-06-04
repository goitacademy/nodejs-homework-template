const express = require('express');
const router = express.Router();
const Controllers = require('../../controllers/users-controllers');

router.post('/signup', Controllers.signup);
router.post('/login', Controllers.login);
router.post('/logout', Controllers.logout);

module.exports = router;
