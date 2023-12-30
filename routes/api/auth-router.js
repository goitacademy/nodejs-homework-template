import express from "express";

import { isEmptyBody, authenticate } from "../../middlewares/index.js";

import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, authController.signup);

authRouter.post("/login", isEmptyBody, authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.signout);

export default authRouter;