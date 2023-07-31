import express from "express";
import userValidator from "../../middlewars/userValidator.js";
import isEmptyBody from "../../middlewars/isEmptyBody.js"
import authController from "../../controllers/auth-controller.js";
import authenticate from "../../middlewars/authenticate.js";
import isSubscription from "../../middlewars/isSubscription.js";

const authRouter = express.Router();

authRouter.post('/users/register',isEmptyBody, userValidator.userRegisterValidator, authController.register )

authRouter.post('/users/login', isEmptyBody, userValidator.userLoginValidator, authController.login);

authRouter.get('/users/current', authenticate, authController.current);

authRouter.post('/users/logout', authenticate, authController.logout);

authRouter.patch('/users/:id', authenticate, isSubscription, authController.updateSubscription);

export default authRouter;