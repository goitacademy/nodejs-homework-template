import express from "express";

import { userControllers } from "../../controllers/index.js";
import { authenticate, upload } from "../../middlewares/index.js";

const userRouter = express.Router();

userRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  userControllers.updateAvatar
);

export default userRouter;
