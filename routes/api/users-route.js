import express from "express";
import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import {
  current,
  resendVerifyMail,
  signin,
  signout,
  signup,
  updateAvatar,
  updateSubscription,
  verifyEmail,
} from "../../controllers/user-controller.js";
import validateBody from "../../decorators/validateBody.js";
import {
  authSchema,
  patchSubscriptionSchema,
  resendVerifyMailSchema,
} from "../../schemas/users-schema.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  isEmptyBody,
  validateBody(authSchema),
  ctrlWrapper(signup)
);

usersRouter.post(
  "/login",
  isEmptyBody,
  validateBody(authSchema),
  ctrlWrapper(signin)
);

usersRouter.post("/logout", ctrlWrapper(authenticate), ctrlWrapper(signout));

usersRouter.get("/current", ctrlWrapper(authenticate), ctrlWrapper(current));

usersRouter.patch(
  "/",
  ctrlWrapper(authenticate),
  isEmptyBody,
  validateBody(patchSubscriptionSchema),
  ctrlWrapper(updateSubscription)
);

usersRouter.patch(
  "/avatars",
  upload.single("avatar"),
  ctrlWrapper(authenticate),
  ctrlWrapper(updateAvatar)
);

usersRouter.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));

usersRouter.post(
  "/verify",
  validateBody(resendVerifyMailSchema),
  ctrlWrapper(resendVerifyMail)
);

export default usersRouter;
