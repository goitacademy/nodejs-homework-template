const express = require('express');

const ctrl = require('../../controllers/auth');

const router = express.Router();

const { validateBody } = require('../../middlewares');

const { schemas } = require('../../models/user');

// sign up
router.post('/user/register', validateBody(schemas.registerSchema), ctrl.register)

// sign in
router.post('/user/login', validateBody(schemas.loginSchema), ctrl.login)

module.exports = router;