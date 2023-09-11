const express = require('express');

const authRouter = express.Router();

const ctrl = require('../../controllers/auth');
const { validateBody } = require('../../middleware');
const isTokenValid = require('../../middleware/isTokenValid');
const { userSchemas } = require('../../models/users');
const upload = require('../../middleware/upload');

authRouter.post('/register', upload.single('avatar'), validateBody(userSchemas.registerUser), ctrl.register);

authRouter.post('/login', validateBody(userSchemas.loginUser), ctrl.login);

authRouter.post('/logout', isTokenValid, ctrl.logout);

authRouter.get('/current', isTokenValid, ctrl.current);

authRouter.patch('/subscription', validateBody(userSchemas.updateSubscription), isTokenValid, ctrl.updateSubscription);

authRouter.patch('/avatars', isTokenValid, upload.single('avatar'), ctrl.updateAvatar);

authRouter.get("/verify/:verificationToken", ctrl.userVerify);

authRouter.post("/verify", validateBody(userSchemas.resendEmail), ctrl.userReVerify);

module.exports = authRouter;