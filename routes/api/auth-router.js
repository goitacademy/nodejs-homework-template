import express from "express";

import { ctrlWrapper } from "../../decorators/index.js";

import {
  signup,
  signin,
  getCurrent,
  logout,
  updateAvatar,
} from "../../controllers/auth-conrollers/index.js";

import { upload } from "../../middlewars/index.js";

import { validateBody } from "../../decorators/index.js";

import {
  userSignupSchema,
  userSigninSchema,
} from "../../schemas/users-schemas.js";

import { authenticate } from "../../middlewars/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  validateBody(userSignupSchema),
  ctrlWrapper(signup)
);

authRouter.post("/login", validateBody(userSigninSchema), ctrlWrapper(signin));

authRouter.get("/current", authenticate, ctrlWrapper(getCurrent));

authRouter.post("/logout", authenticate, ctrlWrapper(logout));

authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  ctrlWrapper(updateAvatar)
);

export default authRouter;
