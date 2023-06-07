const express = require('express');

const router = express.Router();

const { validateBody, authenticate, upload } = require('../../middlewares');

const { schemas } = require('../../models/user');

const ctrl = require('../../controllers/auth');

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.patch('/', authenticate, validateBody(schemas.updateSubscriptionSchema), ctrl.updateSubscriptionUser)

router.post('/logout', authenticate, ctrl.logout);

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar)

module.exports = router