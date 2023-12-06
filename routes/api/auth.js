const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers");

const {
  authenticate,
  validateUsers,
  upload,
  validateBody,
} = require("../../middlewares");

const schemas = require("../../schemas");

router.post(
  "/register",
  validateUsers(schemas.registerAndLoginSchema),
  ctrl.users.register
);

router.get("/verify/:verificationToken", ctrl.users.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.users.resendVerifyEmail
);

router.post(
  "/login",
  validateUsers(schemas.registerAndLoginSchema),
  ctrl.users.login
);

router.get("/current", authenticate, ctrl.users.getCurrent);

router.post("/logout", authenticate, ctrl.users.logOut);

router.patch("/", authenticate, ctrl.users.updateSubscription);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.users.updateAvatar
);

module.exports = router;
