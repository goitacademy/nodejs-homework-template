const express = require("express");

const { users: ctrl } = require("../../controllers");
const { authh, upload, ctrlWrapper, validation } = require("../../middlewares");
const {
  joiSubscriptionSchema,
  verifyEmailSchema,
} = require("../../models/user");

const router = express.Router();

router.get("/current", authh, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/avatars",
  authh,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validation(verifyEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.patch(
  "/",
  authh,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
