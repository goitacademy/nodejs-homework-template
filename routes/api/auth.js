const express = require('express');
const { validateBody, authenticate} = require('../../middlewares');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/auth');

const router = express.Router();

// Реєстрація (signup)
router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

// Підтвердження e-mail
router.get('/verify/:verificationToken', ctrl.verifyEmail);

// Повторна відправка листа для підтвердження e-mail
router.post('/verify', validateBody(schemas.emailSchema), ctrl.resendVerifyEmail);

// Авторизація (signin)
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

// Перевірка валідності токена
router.get('/current', authenticate, ctrl.getCurrent);

// Розлогінитись (logout)
router.post('/logout', authenticate, ctrl.logout);

module.exports = router;