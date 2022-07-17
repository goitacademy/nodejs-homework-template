const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { auth, validation, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { userAuthSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(userAuthSchema), ctrlWrapper(ctrl.signup));
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post(
  "/verify",
  validation(userAuthSchema),
  ctrlWrapper(ctrl.reSendVerifyEmail)
);
router.post("/login", validation(userAuthSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrentUser));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
