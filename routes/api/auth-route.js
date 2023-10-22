import express from "express";
import authController from "../../controllers/auth-controller.js";
import { validateBody } from "../../decorators/index.js";

import { userSignupSchema, userSigninSchema } from "../../models/User.js";

const userSignupValidate = validateBody(userSignupSchema);
const userSigninValidate = validateBody(userSigninSchema);

const authRouter = express.Router();

authRouter.post("/signup", userSignupValidate, authController.signup);

export default authRouter;
