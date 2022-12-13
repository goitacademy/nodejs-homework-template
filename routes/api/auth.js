const express = require('express');

const {validateBody, authenticate, upload} = require('../../middlewars');
const {ctrlWrapper} = require('../../helpers');
const {schemas} = require('../../models/user');
const ctrl = require('../../controllers/auth');
const authRouter = express.Router();

// signup
authRouter.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

authRouter.get('./verify/:verificationToken', ctrlWrapper(ctrl.verify));

authRouter.post('./verify', validateBody(schemas.verifyEmailSchema), ctrlWrapper(ctrl.resendEmail));

// signin
authRouter.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

authRouter.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

authRouter.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

authRouter.patch('/subscription', authenticate, validateBody(schemas.subscriptionSchema), ctrlWrapper(ctrl.updateSubscription));

authRouter.patch('/avatars', authenticate, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = authRouter;