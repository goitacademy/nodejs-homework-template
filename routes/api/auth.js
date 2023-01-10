const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/auth');

const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');

// запрос на регистрацию(signup)
router.post('/register', validateBody(schemas.registerSchema), ctrl.register)

// запрос на логин(signin)
router.post('/login', validateBody(schemas.loginSchema), ctrl.login)

// проверяет токен на валидность
router.get('/current', authenticate, ctrl.getCurrent)

// разлогиниться
router.post('/logout', authenticate, ctrl.logout)



module.exports = router;