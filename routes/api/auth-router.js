import express from "express";
import userController from "../../controllers/user-controller.js";

import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";

const userRouter = express.Router();

userRouter.post("/register", isEmptyBody, userController.register);
userRouter.post("/login", isEmptyBody, userController.login);
userRouter.get("/current", authenticate, userController.getCurrent);
userRouter.post("/logout", authenticate, userController.logout);
userRouter.patch(
  "/avatar",
  upload.single("avatar"),
  authenticate,
  userController.updateAvatar
);
userRouter.get("/verify/:verificationToken", userController.verify);
userRouter.post("/verify", isEmptyBody, userController.resendEmail);

export default userRouter;
