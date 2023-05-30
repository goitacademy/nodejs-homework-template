const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");

// signup
router.post("/register", ctrl.register);

router.get("/verify/:verificationCode", ctrl.verifyEmail);

router.post("/verify", ctrl.resendVerifyEmail);

// signin
router.post("/login", ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

// logout

router.post("/logout", authenticate, ctrl.logout);

// changes in user profile

router.patch("/", authenticate, ctrl.updateSubscription);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
