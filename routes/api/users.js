const express = require("express");

const { auth, ctrlWrapper, upload, validation } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const verifyEmailJoiSchema = require("../../models/users");
const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);
router.post(
  "verify",
  validation(verifyEmailJoiSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

module.exports = router;
