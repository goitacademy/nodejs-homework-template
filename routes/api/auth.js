import express from "express";
import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

export default authRouter;
import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { userSignupShema, userSigninShema } from "../../models/User.js";

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userSignupShema),
  authController.signup
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSigninShema),
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.signout);

authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  authController.updateAvatar
);
