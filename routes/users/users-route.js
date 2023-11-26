import express from "express";
import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";
import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import {
  current,
  signin,
  signout,
  signup,
} from "../../controllers/user-controller.js";
import validateBody from "../../decorators/validateBody.js";
import { authSchema } from "../../schemas/users-schema.js";

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

export default usersRouter;
