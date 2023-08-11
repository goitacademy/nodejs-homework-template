import express from "express";
import validateBody from "../../decorators/validateBody.js";
import usersSchemas from "../../schemas/users-schemas.js";
import authController from "../../controllers/auth-controller.js";
import {authenticate, upload } from "../../midllewars/index.js";

const authRouter = express.Router();

authRouter.post('/register', validateBody(usersSchemas.usersSignupSigninSchema), authController.signup);
authRouter.post('/login', validateBody(usersSchemas.usersSignupSigninSchema), authController.signin);
authRouter.get('/current', authenticate, authController.getCurrent);
authRouter.post('/logout', authenticate, authController.signout);
authRouter.patch('/', authenticate, authController.updateSubscription);
authRouter.patch("/avatars", authenticate, upload.single('avatar'), authController.updateAvatar);

export default authRouter;

