const express = require('express');
const { register, login, logout, refresh } = require('../../controllers/users');
const validateBody = require('../../middlewares/validateBody');
const { registerSchema, loginSchema } = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);

router.post('/login', validateBody(loginSchema), login);

router.post('/logout', logout);

router.get('/current', refresh);

module.exports = router;
