const express = require("express");
const { validateBody, auth } = require("../../middlewares");
const {
  registerJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
  emailSchema,
} = require("../../schemas/user");

const ctrl = require("../../controllers/authController");
const authRouter = express.Router();

// Signup
authRouter.post("/register", validateBody(registerJoiSchema), ctrl.register);

// verifyEmail
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post("/verify", validateBody(emailSchema), ctrl.resendVerifyEmail);

// Signin
authRouter.post("/login", validateBody(loginJoiSchema), ctrl.login);

authRouter.get("/current", auth, ctrl.getCurrent);

authRouter.post("/logout", auth, ctrl.logout);

authRouter.patch(
  "/subscription",
  auth,
  validateBody(subscriptionJoiSchema),
  ctrl.subscription
);

module.exports = authRouter;
