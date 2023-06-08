const express = require('express');

const router = express.Router();
const { register, login, getCurrent, logout } = require('../../controllers/auth-controller');
const { validateBody } = require('../../utils');
const { userRegisterSchema } = require('../../schemas');
const { authenticate } = require('../../middlewares');

router.post('/register', validateBody(userRegisterSchema), register);

router.post('/login', validateBody(userRegisterSchema), login);

router.get('/current', authenticate, getCurrent);

router.post('/logout', authenticate, logout);

module.exports = router;