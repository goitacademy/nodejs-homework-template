const express = require("express");

const { tokenValidation, upload } = require("../../middleware");

const { users: ctrl } = require("../../fetch");

const router = express.Router();

router.post("/register", ctrl.signup);
router.post("/login", ctrl.login);
router.get("/current", tokenValidation, ctrl.getCurrentUser);
router.post("/logout", tokenValidation, ctrl.logout);
router.patch(
  "/avatars",
  tokenValidation,
  upload.single("avatar"),
  ctrl.updateAvatar
);

router.patch("/", tokenValidation, ctrl.updateSubscription);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", ctrl.resendEmail);

module.exports = router;