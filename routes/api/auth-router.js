import express from "express";
import authController from "../../controllers/auth-controller.js";
import { isEmptyBody, isValidId } from "../../middleware/index.js";
import { userSigninSchema, userSignupSchema } from "../../models/User.js";
import { validateBody } from "../../decorators/index.js";


const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, validateBody(userSignupSchema), authController.signup);
authRouter.post("/signin", isEmptyBody, validateBody(userSigninSchema), authController.signin);

export default authRouter;
