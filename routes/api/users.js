import { Router } from "express";
import { auth } from "../../middlewares/passport.js";
import { upload } from "../../middlewares/multer.js";
import {
  current,
  login,
  logout,
  signUp,
  uploadAvatar,
  userEmailVerify,
  userReplyEmail,
} from "../../controllers/usersController.js";

export const usersRouter = Router();

usersRouter.post("/signup", signUp);
usersRouter.post("/login", login);
usersRouter.get("/logout", auth, logout);
usersRouter.get("/current", auth, current);
usersRouter.patch("/avatars", auth, upload.single("avatar"), uploadAvatar);
usersRouter.get("/verify/:verificationToken", userEmailVerify);
usersRouter.post("/verify", userReplyEmail);
