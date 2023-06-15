const express = require("express");
const validateBody = require("../../decorators/validateBody.js");
const ctrl = require("../../controllers/auth.js");
const { schemas } = require("../../models/user.js");
const authenticate = require("../../middleware/authenticate.js");
const validateSubsBody = require("../../decorators/validateSubsBody.js");
const upload = require("../../middleware/upload.js");
const validateEmailBody = require("../../decorators/validateEmailBody.js");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post(
  "/verify",
  validateEmailBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/subscription",
  authenticate,
  validateSubsBody(schemas.subscriptionSchema),
  ctrl.updateSubscription
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
