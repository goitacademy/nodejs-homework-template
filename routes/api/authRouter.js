import express from "express";

import authController from "../../controller/authController.js";

import authenticate from "../../middlewars/authenticate.js";

const authRouter = express.Router();

authRouter.post('/register', authController.signup);

authRouter.post('/login', authController.signin);

authRouter.get('/current', authenticate, authController.getCurrent);

authRouter.post('/logout', authenticate, authController.logout);

export default authRouter;
