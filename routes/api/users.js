const express = require('express');

const { users: ctrl } = require('../../controllers');
const { auth } = require('../../middlewares');

const router = express.Router();

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/logout', auth, ctrl.logout);

router.get('/current', auth, ctrl.current);

module.exports = router;
