const express = require("express");
const router = express.Router();

const { auth: ctrl } = require("../../controllers");

const { validation, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

// signup
router.post("/signup", validation(schemas.signupSchema), ctrl.signup);

// verification by e-mail
router.get("/verify/:verificationToken", ctrl.verify);

// re-verification by e-mail
router.post("/verify", ctrl.reVerify);

// login
router.post("/login", validation(schemas.loginSchema), ctrl.login);

// Current user request
router.get("/current", authenticate, ctrl.getCurrent);

// Logout request
router.get("/logout", authenticate, ctrl.logout);

// Avatar update
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
