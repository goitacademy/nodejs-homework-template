import express from "express";
import { validateBody } from '../../decorators/index.js';
import userSchemas from "../../schemas/users-schemas.js";
import authController from "../../controllers/auth-controller.js";
import {authenticate} from "../../middlewars/index.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(userSchemas.userSignupSchema), authController.signup);
authRouter.post("/login", validateBody(userSchemas.userSigninSchema), authController.signin);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.signout);

export default authRouter;