const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/users');

router.post('/signup', ctrl.signup);
router.post('/login', ctrl.login);
router.post('/logout', ctrl.logout);

module.exports = router;
