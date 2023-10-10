import express from "express";

const authRouter = express.Router();

import authController from "../../controllers/auth-controller.js";

import userAuthValidate from "../../middlewares/validation/user-validation.js";

import {authenticate} from "../../middlewares/authentication/index.js"

authRouter.post("/register", userAuthValidate.userSignUpValidate, authController.signUp);
authRouter.post("/login", userAuthValidate.userSignInValidate, authController.signIn);
authRouter.post("/refresch", userAuthValidate.userRefreschValidate, authController.refresch)
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authController.signOut);



export default authRouter;
