const express = require('express');
const router = express.Router();
const { validateBody, authenticate } = require('../../decorators');
const { authSchemas } = require('../../models');
const { register, login, getCurrent, logout } = require('../../controllers');


router.post('/register', validateBody(authSchemas.registerSchema), register);
router.post('/login', validateBody(authSchemas.registerSchema), login);
router.get('/current', authenticate, getCurrent);
router.post('/logout', authenticate, logout);

module.exports = router;