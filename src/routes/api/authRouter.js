const express = require("express");
const router = express.Router();

const { validation, auth, asyncWrapper, upload } = require("../../middlewares");
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiUpdateSubscriptionSchema,
  joiVerifyEmailSchema,
} = require("../../models");

const { auth: ctrl } = require("../../controllers");

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrl.updateAvatarCloudinary
);

router.get("/", asyncWrapper(ctrl.getAll));

router.get("/verify/:verificationToken", asyncWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validation(joiVerifyEmailSchema),
  asyncWrapper(ctrl.resendVerifyEmail)
);

router.post(
  "/signup",
  validation(joiRegisterSchema),
  asyncWrapper(ctrl.signup)
);

router.post("/login", validation(joiLoginSchema), asyncWrapper(ctrl.login));

router.get("/current", auth, asyncWrapper(ctrl.getCurrent));

router.get("/logout", auth, asyncWrapper(ctrl.logout));

router.patch(
  "/",
  auth,
  validation(joiUpdateSubscriptionSchema),
  asyncWrapper(ctrl.updateSubscription)
);

module.exports = { authRouter: router };
