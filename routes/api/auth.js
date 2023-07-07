const express = require('express');

const ctrl = require('../../controllers/auth/register');

const { validateBody } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);
// router.post('/login', validateBody(schemas.loginSchema));
// router.post('/logout');

module.exports = router;
