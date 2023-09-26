const express = require('express');
const router = express.Router();

const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/authContr');

// маршрут для реєстрації
router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

// маршрут для авторизації - логіну
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

// маршрут для отримання поточного користувача
router.get('/current', authenticate, ctrl.getCurrent);

// маршрут для розлогування
router.post('/logout', authenticate, ctrl.logout);

// PATCH: оновлення підписки користувача
router.patch('/', authenticate, ctrl.updateSubscription);

module.exports = router;