const express = require('express');
const router = express.Router();
const { validateBody, isValidId } = require('../../decorators');
const { authSchemas } = require('../../models');
const { register } = require('../../controllers');
const { login } = require('../../controllers');


router.post('/register', validateBody(authSchemas.registerSchema), register);
router.post('/login', validateBody(authSchemas.registerSchema), login);

module.exports = router;