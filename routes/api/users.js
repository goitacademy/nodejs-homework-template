const express = require("express");

const router = express.Router();

const { ctrlWrapper, auth, validation, upload } = require("../../middlewares");

const { joiSubscriptionSchema, joiEmailSchema } = require("../../models/users");
const { users: ctrl } = require("../../controllers");

router.patch(
  "/",
  auth,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.post(
  "/verify",
  validation(joiEmailSchema),
  ctrlWrapper(ctrl.repeatEmailVerifyMessage)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

module.exports = router;
