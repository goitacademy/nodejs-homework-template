const express = require("express");

const { registerValid, loginValid, emailValid, updateSubscriptionValid }  = require("../../middlewares/authValidation");
const { updateAvatarValid }  = require("../../middlewares/avatarValidation");
const  authCtrl  = require("../../controllers/auth");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

const router = express.Router();

router.post(
  "/register",
  registerValid,
  authCtrl.register
);

router.get("/verify/:verificationToken", authCtrl.verify);

router.post(
  "/verify",
  emailValid,
  authCtrl.resendVerifyEmail
);

router.post("/login", loginValid, authCtrl.login);

router.post("/logout", authenticate, authCtrl.logout);

router.get("/current", authenticate, authCtrl.getCurrent);

router.patch(
  "/",
  authenticate,
  updateSubscriptionValid,
  authCtrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  updateAvatarValid,
  upload.single("avatar"),
  authCtrl.updateAvatar
);

module.exports = router;