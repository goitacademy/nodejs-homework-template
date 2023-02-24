const express = require('express');
const { validateUser } = require('../../validation/userValidation');
const wrap = require('../../helper/heandle-error');
const guard = require('../../helper/quard');
const router = express.Router();

const controller = require('../../controllers/userController');

router.post('/signup', validateUser, wrap(controller.register));

router.post('/login', validateUser, wrap(controller.logIn));

router.get('/current', guard, wrap(controller.getCurrent));

router.post('/logout', guard, wrap(controller.logOut));

module.exports = router;
