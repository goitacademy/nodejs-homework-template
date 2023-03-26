const express = require("express");

const ctrl = require("../../controllers/users");

const { validateBody, authenticate, upload } = require("../../middlewares");

const {
  updateSubscriptionSchemaJoi,
  verifyEmailJoiSchema,
} = require("../../models/user");

const router = express.Router();

router.post("/verify", validateBody(verifyEmailJoiSchema), ctrl.resendVerify);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchemaJoi),
  ctrl.updateSubscription
);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
