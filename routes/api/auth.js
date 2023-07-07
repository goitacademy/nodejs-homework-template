const express = require('express');

const ctrl = require('../../controllers/auth');

const { validateBody } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

// singin
router.post('/register', validateBody(schemas.registerSchema), ctrl.register);
// signup
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);
// router.post('/logout');

module.exports = router;
