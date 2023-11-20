import express from "express";
import { validateBody } from "../../decorators/index.js";
import { signUpSchema, signInSchema } from "../../models/user.js";
import ctrl from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(signUpSchema), ctrl.signUp);

authRouter.post("/signin", validateBody(signInSchema), ctrl.signIn);

export default authRouter;
