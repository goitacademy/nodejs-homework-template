const express = require('express');
const ctrl = require('../../controllers/authControllers');
const { authorizationMiddleware } = require('../../middleware');
const { authValidation } = require('../../validation');

const router = express.Router();

router.post('/register', authValidation, ctrl.registeration);

router.post('/login', authValidation, ctrl.login);

router.post('/current', authorizationMiddleware, ctrl.getCurrent);

router.post('/logout', authorizationMiddleware, ctrl.logout);

module.exports = router;
