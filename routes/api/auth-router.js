const express = require("express");

const authController = require("../../controllers/auth-controller");

const isEmptyBody = require("../../middlewares/isEmptyBody");
const validateBody = require("../../decorators/validateBody");

const { userSignupSchema, userSigninSchema } = require("../../models/User");

const userSignupValidate = validateBody(userSignupSchema);
const userSigninValidate = validateBody(userSigninSchema);
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  userSignupValidate,
  authController.signup
);

authRouter.post(
  "/signin",
  isEmptyBody,
  userSigninValidate,
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

module.exports = authRouter;
