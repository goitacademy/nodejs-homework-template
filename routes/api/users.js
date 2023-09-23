import { Router } from "express";
import { auth } from "../../middlewares/passport.js";
import { upload } from "../../middlewares/multer.js";
import {
  current,
  login,
  logout,
  signUp,
  uploadAvatar,
} from "../../controllers/usersController.js";

export const usersRouter = Router();

usersRouter.post("/signup", signUp);
usersRouter.post("/login", login);
usersRouter.get("/logout", auth, logout);
usersRouter.get("/current", auth, current);
usersRouter.patch("/avatars", auth, upload.single("avatar"), uploadAvatar);
