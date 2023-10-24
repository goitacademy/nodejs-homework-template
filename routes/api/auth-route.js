import express from "express";
import authController from "../../controllers/auth-controller.js";
import { validateBody } from "../../decorators/index.js";

import { userSignupSchema, userSigninSchema } from "../../models/User.js";
import { authenticate, upload } from "../../middlewares/index.js";

const userSignupValidate = validateBody(userSignupSchema);
const userSigninValidate = validateBody(userSigninSchema);

const authRouter = express.Router();

authRouter.post("/register", userSignupValidate, authController.register);
authRouter.post("/login", userSigninValidate, authController.login);
authRouter.post("/logout", authenticate, authController.logout);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.patch(
  "/avatars",
  upload.single("avatarURL"),
  authenticate,
  authController.changeAvatar
);

export default authRouter;
