const express = require('express');
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/auth');

const router = express.Router();

// Реєстрація (signup)
router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

// Авторизація (signin)
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;