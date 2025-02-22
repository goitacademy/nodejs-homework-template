import express from "express";
import {
  registered,
  login,
  current,
  updateAvatar,
  logout,
} from "../../controllers/auth/index.js";
import { validateBody } from "../../decorator/index.js";
import {usersSchemas} from "../../schemas/index.js";
import { authenticate, upload } from "../../middlewars/index.js";

const authRouter = express.Router();

authRouter.post(
  "/registered",
  validateBody(usersSchemas.userSignupSchema),
  registered
);

authRouter.post("/login", validateBody(usersSchemas.userSigninSchema), login);

authRouter.get("/current", authenticate, current);

authRouter.patch(
  "/avatars",
  upload.single("avatarURL"),
  authenticate,
  updateAvatar
);

authRouter.post("/logout", authenticate, logout);

export default authRouter;
