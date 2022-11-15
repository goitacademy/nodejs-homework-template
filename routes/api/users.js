const express = require("express");

const {
  upload,
  ctrlWrapper,
  isValidId,
  auth,
  validation,
} = require("../../middlewares");

const {
  joiUpdateSubscriptionSchema,
  joiVerifyEmailSchema,
} = require("../../models/user");

const { users: ctrl } = require("../../controllers");

const router = express.Router();
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/",
  auth,
  validation(joiUpdateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validation(joiVerifyEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

module.exports = router;
