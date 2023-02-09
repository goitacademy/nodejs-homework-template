const express = require('express');
const router = express.Router();

const { authenticate } = require('../../middlewares');
const { ControllersHelper } = require('../../helpers');
const ctrl = require('../../controllers/auth');

router.post('/registration', ControllersHelper(ctrl.registration));

router.post('/login', ControllersHelper(ctrl.login));

router.get('/current', authenticate, ControllersHelper(ctrl.getCurrent));

router.post('/logout', authenticate, ControllersHelper(ctrl.logout));

module.exports = router;
