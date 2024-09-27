import { Router } from "express";
import {
  signUpHandler,
  loginHandler,
  logoutHandler,
  currentHandler,
  uploadAvatarHandler,
  updateAvatarHandler,
  verificationHandler,
  validateResendEmailRequest,
  resendVerificationEmailHandler,
} from "../controllers/users.controller.js";
import upload from "../Config/multerConfig.js";
import authMiddleware from "../middleware/authenticateToken.js";

const userRouter = Router();

userRouter.post("/signup", signUpHandler);
userRouter.post("/login", loginHandler);
userRouter.post(
  "/verify",
  validateResendEmailRequest,
  resendVerificationEmailHandler
);
userRouter.get("/logout", authMiddleware, logoutHandler);
userRouter.get("/current", authMiddleware, currentHandler);
userRouter.get("/verify/:verificationToken", verificationHandler);
userRouter.post("/upload-avatar", uploadAvatarHandler);
userRouter.patch("/avatars", upload.single("avatar"), updateAvatarHandler);

export { userRouter };
