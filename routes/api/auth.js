const express = require('express');

const ctrl = require('../../controllers/auth');

const { validationBody, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

// signup
router.post('/signup', validationBody(schemas.registerSchema), ctrl.register);

// signin
router.post('/login', validationBody(schemas.loginSchema), ctrl.login);
router.get('/current', authenticate, ctrl.getCurrent);

router.get('/logout', authenticate, ctrl.logout);

module.exports = router;
