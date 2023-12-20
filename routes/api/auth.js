const express = require('express');

const ctrl = require('../../controllers/auth');

const router = express.Router();

const { validateBody, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/user');

// sign up
router.post('/users/register', validateBody(schemas.registerSchema), ctrl.register)

// sign in
router.post('/users/login', validateBody(schemas.loginSchema), ctrl.login)

router.get('/users/current', authenticate, ctrl.getCurrent)

router.post('/users/logout', authenticate, ctrl.logout)

module.exports = router;