const express = require("express");
const authRouter = express.Router();

const { userSchema, userEmailSchema } = require("../../schemas");
const {
  validation,
  isAmptyBody,
  upload,
  resize,
  isAmptyEmailField,
} = require("../../middlewares");

const validateMiddleWare = validation(userSchema);
const validateEmailField = validation(userEmailSchema);
const ctrl = require("../../controllers/auth/auth-controllers");

const { authenticate } = require("../../middlewares");

authRouter.post(
  "/register",
  upload.single("avatar"),
  isAmptyBody,
  validateMiddleWare,
  ctrl.signup
);

authRouter.get("/verify/:verificationToken", ctrl.verify);

authRouter.post(
  "/verify",
  isAmptyEmailField,
  validateEmailField,
  ctrl.resendEmail
);

authRouter.post("/login", isAmptyBody, validateMiddleWare, ctrl.login);

authRouter.get("/current", authenticate, ctrl.getCurrent);

authRouter.post("/logout", authenticate, ctrl.logout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  resize,
  ctrl.updAvatar
);

module.exports = authRouter;
