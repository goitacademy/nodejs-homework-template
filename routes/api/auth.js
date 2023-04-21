import { Router } from "express";
import * as authController from "../../controller/auth.js";
const authRouter = Router();

authRouter.post("/singup", authController.singup);

authRouter.post("/login", authController.login);
authRouter.get("/logout", authController.authorization, authController.logout);

authRouter.get(
  "/current",
  authController.authorization,
  authController.currentUser
);

authRouter.patch(
  "/",
  authController.authorization,
  authController.updateSubscription
);

export { authRouter };
