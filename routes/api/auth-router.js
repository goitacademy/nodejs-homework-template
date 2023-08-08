import express from "express";
import validateBody from "../../decorators/validateBody.js";
import usersSchemas from "../../schemas/users-schemas.js";
import authController from "../../controllers/auth-controller.js";
import authenticate from "../../midllewars/authenticate.js";

const authRouter = express.Router();

authRouter.post('/register', validateBody(usersSchemas), authController.signup);
authRouter.post('/login', validateBody(usersSchemas), authController.signin);
authRouter.get('/current', authenticate, authController.getCurrent);
authRouter.post('/logout', authenticate, authController.signout);
authRouter.patch('/', authenticate, authController.updateSubscription);


export default authRouter;

