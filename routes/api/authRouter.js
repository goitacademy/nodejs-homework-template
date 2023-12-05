const express = require("express");
const { validateBody, auth } = require("../../middlewares");
const {
  registerJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
} = require("../../schemas/user");

const ctrl = require("../../controllers/authController");
const authRouter = express.Router();

// Signup
authRouter.post("/register", validateBody(registerJoiSchema), ctrl.register);

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
