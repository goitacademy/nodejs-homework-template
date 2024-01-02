const express = require("express");
const authRouter = express.Router();
const ctrl = require("../../controllers/auth-controller");
const { authenticate, validateBody, upload } = require("../../middleware");
const { schemas } = require("../../models/users");

const userSignupValidate = validateBody(schemas.userSignupSchema);
const userSigninValidate = validateBody(schemas.userSigninSchema);
const userSubscriptionValidate = validateBody(schemas.userSubscriptionSchema);
const userEmailValidate = validateBody(schemas.userEmailSchema);

authRouter.post("/register", userSignupValidate, ctrl.signup);
authRouter.post("/login", userSigninValidate, ctrl.signin);
authRouter.get("/current", authenticate, ctrl.getCurrent);
authRouter.post("/logout", authenticate, ctrl.logout);
authRouter.patch(
  "/",
  authenticate,
  userSubscriptionValidate,
  ctrl.updateSubscription
);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);
authRouter.get("/verify/:verificationToken", ctrl.verify);
authRouter.post("/verify", userEmailValidate, ctrl.resendVerifyEmail);

module.exports = authRouter;
