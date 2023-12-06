import express from "express";

import { userControllers } from "../../controllers";
import { authenticate, upload } from "../../middlewares";

const userRouter = express.Router();

userRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  userControllers.updateAvatar
);

export default userRouter;
