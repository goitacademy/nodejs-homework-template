import express from "express";

import usersController from "../../controllers/users-controller.js";

import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import { userRegisterSchema, userLoginSchema } from "../../models/User.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userRegisterSchema),
  usersController.register
);

usersRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userLoginSchema),
  usersController.login
);

usersRouter.get("/current", authenticate, usersController.getCurrent);

usersRouter.post("/logout", authenticate, usersController.logout);

usersRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  usersController.changeAvatar
);

export default usersRouter;
