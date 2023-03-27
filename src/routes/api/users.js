const express = require("express");
const { auth, upload } = require("../../middlewares");

const router = express.Router();

const { controllerWrapper } = require("../../helpers");
const {
  registrationCtrl,
  loginCtrl,
  logoutCtrl,
  currentUserCtrl,
  subscriptionChangeCtrl,
  AvatarCtrl,
  verificationCtrl,
  repeatVerificationCtrl,
} = require("../../controllers");

router.post("/register", controllerWrapper(registrationCtrl));
router.post("/login", controllerWrapper(loginCtrl));
router.get("/logout", auth, controllerWrapper(logoutCtrl));
router.get("/current", auth, controllerWrapper(currentUserCtrl));
router.patch("/subscription", auth, controllerWrapper(subscriptionChangeCtrl));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  controllerWrapper(AvatarCtrl)
);

router.get("/verify/:verificationToken", controllerWrapper(verificationCtrl));
router.post("/verify", controllerWrapper(repeatVerificationCtrl));

module.exports = router;
