const express = require('express');
const validateBody = require('../../middelewares/validateBody');
const ctrl = require('../../controllers/users');
const {schema} = require('../../models/user');
const authenticate = require('../../middelewares/authenticate');
const upload = require('../../middelewares/upload');

const router = express.Router();

router.post('/register', validateBody(schema.registerSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post('/verify', validateBody(schema.emailSchema), ctrl.resendVerifyEmail);

router.post('/login', validateBody(schema.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/:id/subscription', authenticate, validateBody(schema.subscriptionSchema), ctrl.subscription);

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar);

module.exports = router;
