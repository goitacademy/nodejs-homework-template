import express from "express";
import { validateBody } from "../decorators/index.js";
import { loginSchema, registerSchema } from "../models/user.js";
import ctrl from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), ctrl.signUp);
authRouter.post("/login", validateBody(loginSchema), ctrl.signIn);

export default authRouter;
