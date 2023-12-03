import express from "express";

import authController from "../../controllers/auth-controller.js";

import { authenticate, isEmptyBody } from "../../middlewares/index.js";

// import { validateBody } from "../../decorators/index.js";

// import { userSignupSchema, userSigninSchema } from "../../models/User.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, authController.signup);

authRouter.post("/login", isEmptyBody, authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.signout);

export default authRouter;
