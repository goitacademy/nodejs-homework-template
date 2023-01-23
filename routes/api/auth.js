const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/auth');

const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');

// запрос на регистрацию(signup)
router.post('/register', validateBody(schemas.registerSchema), ctrl.register)

router.get('/verify/:verificationToken', ctrl.verify)

// запрос на повторную отправку письма для верификации
router.post('/verify', validateBody(schemas.emailSchema), ctrl.resendVerifyEmail)

// запрос на логин(signin)
router.post('/login', validateBody(schemas.loginSchema), ctrl.login)

// проверяет токен на валидность
router.get('/current', authenticate, ctrl.getCurrent)

// разлогиниться
router.post('/logout', authenticate, ctrl.logout)

// изменить аватарку
router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar)



module.exports = router;