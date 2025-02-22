const express = require("express");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth");

const router = express.Router();

// signUp
router.post(
  "/users/register",
  validateBody(schemas.registerShema),
  ctrl.register
);

router.get("/users/verify/:verificationCode", ctrl.verifyEmail);

router.post(
  "/users/verify",
  validateBody(schemas.emailShema),
  ctrl.resendVerifyEmail
);
// signin
router.post("/users/login", validateBody(schemas.loginShema), ctrl.login);

router.post("/users/logout", authenticate, ctrl.logout);

router.get("/users/current", authenticate, ctrl.getCurrent);

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
