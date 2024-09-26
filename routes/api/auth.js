import express from "express";
import authController from "../../controllers/auth.js";
import { validateBody, authenticate, isEmptyBody } from "../../middlewares/index.js";
import { registerSchema, loginSchema, updateSubscriptionSchema } from "../../models/user.js";
import userSchemas from "../../models/user.js";

const registerValidate = validateBody(registerSchema);
const loginValidate = validateBody(loginSchema);
const updateSubscriptionValidate = validateBody(updateSubscriptionSchema);




const authRouter = express.Router();

// Sign Up
authRouter.post("/register", isEmptyBody, registerValidate, authController.register);

// Sign In
authRouter.post("/login", isEmptyBody, loginValidate, authController.login);

// Get current user
authRouter.get("/current", authenticate, authController.getCurrent);

// Logout
authRouter.post("/logout", authenticate, authController.logout);

// Update subscription
authRouter.patch( "/subscription", authenticate, updateSubscriptionValidate, authController.updateSubscription);

export default authRouter;
