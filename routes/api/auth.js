const express = require("express");

const ctrl = require("../../controllers/auth-controllers");

const router = express.Router();

const {
  validateBody,
  authenticate,
  validateSubsBody,
  upload,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

const jsonParser = express.json();

// signup
router.post(
  "/register",
  jsonParser,
  validateBody(schemas.registerSchema),
  ctrl.register
);

// verify email
router.get("/verify/:verificationToken", ctrl.verify);

// resend verify email
router.post(
  "/verify",
  jsonParser,
  validateBody(schemas.userEmailSchema),
  ctrl.resendVerifyEmail
);

// signin
router.post(
  "/login",
  jsonParser,
  validateBody(schemas.loginSchema),
  ctrl.login
);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  jsonParser,
  validateSubsBody(schemas.updateSubsSchema),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);
module.exports = router;
