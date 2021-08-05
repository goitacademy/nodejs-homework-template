const express = require('express');
const { auth: ctrl } = require('../../controllers');
const { authenticate } = require('../../middlewares');

const router = express.Router();

router.post('/signup', express.json(), ctrl.signup);

router.post('/login', express.json(), ctrl.login);

router.get('/logout', authenticate, ctrl.logout);

module.exports = router;
