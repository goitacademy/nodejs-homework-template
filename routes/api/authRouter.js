import express from "express";
import { validateBody, authenticate } from "../../middlewares/index.js";
import { registerSchema, loginSchema } from "../../schemas/user.js";
import {
  ctrlLogin,
  ctrlCurrentUser,
  ctrlLogout,
  ctrlRegister,
} from "../../controllers/auth/index.js";
import ctrlAvatar from "./avatarRouter.js";

const authRouter = express.Router();
authRouter.post("/register", validateBody(registerSchema), ctrlRegister);
authRouter.post("/login", validateBody(loginSchema), ctrlLogin);
authRouter.post("/logout", authenticate, ctrlLogout);
authRouter.get("/current", authenticate, ctrlCurrentUser);
authRouter.patch("/avatars", authenticate, ctrlAvatar);

export default authRouter;