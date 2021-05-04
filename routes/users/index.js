const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/users');
const guard = require('../../helper/guard');

router.post('/signup', ctrl.reg);
router.post('/login', ctrl.login);
router.post('/logout', guard, ctrl.logout);
router.get('/current', guard, ctrl.current);

module.exports = router;
