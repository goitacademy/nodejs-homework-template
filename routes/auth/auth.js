const express = require("express");

const ctrl = require('../../controller');

const router = express.Router();

const { validateBody } = require("../../middleware");

const { userSchemas } = require("../../models");

router.post('/register', validateBody(userSchemas.registerSchema), ctrl.register );

router.post('/login', validateBody(userSchemas.loginSchema), ctrl.login);


module.exports = router;
