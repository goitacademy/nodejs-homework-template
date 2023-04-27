const express = require('express');
const router = express.Router();
const ctrl = require('../..//controllers/auth');

const { schemas } = require('../..//models/user');
const { validateBody, authenticate } = require('../../middlewares');

// sign up
router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

// sign in
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

// current user
router.get('/current', authenticate, ctrl.getCurrentUser);

// logout
router.post('/logout', authenticate, ctrl.logout);

module.exports = router;
