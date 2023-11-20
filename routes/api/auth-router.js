import express from "express";
import { validateBody } from "../../decorators/index.js";
import { signUpSchema, signInSchema } from "../../models/user.js";
import { authenticate, isEmptyBody } from "../../middlewares/index.js";
import authController from "../../controllers/auth-controller.js";

const signUpValidate = validateBody(signUpSchema);
const signInValidate = validateBody(signInSchema);

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, signUpValidate, authController.signUp);

authRouter.post("/signin", isEmptyBody, signInValidate, authController.signIn);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signOut);

export default authRouter;
