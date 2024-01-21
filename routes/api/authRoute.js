import express from "express";
import { userSigninSchema, userSignupSchema } from "../../models/User.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import authController from "../../controllers/auth-controller.js";
import validateBody from "../../decorators/validateBody.js";
import authenticate from "../../middlewares/autheticate.js";
import { contactUpdateFavoriteSchema } from "../../models/Contact.js";
import upload from "../../middlewares/upload.js";
import sizeChange from "../../middlewares/sizeChange.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  upload.single("avatar"),
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(userSigninSchema),
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch(
  "/users",
  authenticate,
  validateBody(contactUpdateFavoriteSchema)
);

authRouter.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  sizeChange,
  authController.updateAvatar
);

export default authRouter;
