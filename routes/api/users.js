const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const { auth, upload, authSocial } = require("../../middlewares");

router.post("/signup", ctrl.signup);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post("/verify", ctrl.sendVerifyEmail);
router.post("/login", ctrl.login);
router.post("/logout", auth, ctrl.logout);
router.get("/current", auth, ctrl.getCurrent);
router.patch("/", auth, ctrl.updateSubscription);
router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);

router.get(
  "/google",
  authSocial.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  authSocial.authenticate("google", { session: false }),
  ctrl.googleAuthLogin
);
router.get(
  "/facebook",
  authSocial.authenticate("facebook", { scope: ["email", "public_profile"] })
);
router.get(
  "/facebook/callback",
  authSocial.authenticate("facebook", { session: false }),
  ctrl.facebookAuthLogin
);

module.exports = router;
