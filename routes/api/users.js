const express = require('express');

const ctrl = require('../../controllers/auth');

const router = express.Router();

const { authoriz } = require('../../middelwares');

router.post('/signup', ctrl.signup);

router.post('/login', ctrl.login);

router.get('/current', authoriz, ctrl.current);

router.get('/logout', authoriz, ctrl.logout);

module.exports = router;