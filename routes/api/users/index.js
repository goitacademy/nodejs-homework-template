const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/users');
const guard = require('../../../helpers/guard');

router.post('/signup', ctrl.signup);
router.post('/login', ctrl.login);
router.post('/logout', ctrl.logout);
router.post('/current', guard, ctrl.current);

module.exports = router;
