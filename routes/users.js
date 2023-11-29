import express from "express";
import {
  signup,
  login,
  logout,
  getCurrentUser,
  updateAvatar,
  verifyEmail,
  resendVerificationEmail,
} from "#controllers/users/index.js";
import { checkToken } from "#middleware/auth.js";
import { upload } from "#middleware/upload.js";

export const routerUsers = express.Router();

routerUsers.post("/signup", signup);
routerUsers.post("/login", login);
routerUsers.post("/logout", checkToken, logout);
routerUsers.get("/current", checkToken, getCurrentUser);
routerUsers.patch("/avatars", checkToken, upload.single("avatar"), updateAvatar);
routerUsers.get("/verify/:verificationToken", verifyEmail);
routerUsers.post("/verify", resendVerificationEmail);
