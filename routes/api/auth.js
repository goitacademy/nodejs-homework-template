const express = require("express");
const authRouter = express.Router();
const ctrl = require("../../controllers/auth-controller");
const { authenticate, validateBody } = require("../../middleware");
const { schemas } = require("../../models/users");

const userSignupValidate = validateBody(schemas.userSignupSchema);
const userSigninValidate = validateBody(schemas.userSigninSchema);
const userSubscriptionValidate = validateBody(schemas.userSubscriptionSchema);

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

module.exports = authRouter;
