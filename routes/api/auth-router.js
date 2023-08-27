import express from "express";
import userSchemas from "../../schemas/user-schemas.js";
import { validateBody } from "../../decorators/index.js";
import authController from "../../controllers/auth-controller.js";
import { authenticate, upload } from "../../middlewares/index.js";
const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(userSchemas.userSingUpAndSingInSchema),
  authController.singUp
);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post(
  "/users/verify",
  validateBody(userSchemas.userEmailVerifySchema),
  authController.resendVerifyEmail
);

authRouter.post(
  "/signin",
  validateBody(userSchemas.userSingUpAndSingInSchema),
  authController.singIn
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/singout", authenticate, authController.singOut);

authRouter.patch(
  "/users",
  authenticate,
  validateBody(userSchemas.updateSubscriptionStatusSchema),
  authController.updateSubscriptionStatus
);

authRouter.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatarStatus
);

export default authRouter;
