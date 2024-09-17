const express = require("express");

const ctrl = require('../../controller');

const router = express.Router();

const { validateBody, authenticate } = require("../../middleware");

const { userSchemas } = require("../../models");

router.post('/register', validateBody(userSchemas.registerSchema), ctrl.register );

router.post('/login', validateBody(userSchemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

module.exports = router;
