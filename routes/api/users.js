const express = require("express");
const router = express.Router();
const validateBody = require("../../decorators/validateBody");
const {
  newUserSchema,
  updateSubscriptionSchema,
  verifyEmailSchema,
} = require("../../schemas/users-schemas");
const authenticate = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");
const ctrl = require("../../controllers/users-controllers");

router.post("/register", validateBody(newUserSchema), ctrl.register);
router.get("/verify/:verificationCode", ctrl.verify);
router.post("/verify", validateBody(verifyEmailSchema), ctrl.resendVerifyEmail);
router.post("/login", validateBody(newUserSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/",
  validateBody(updateSubscriptionSchema),
  authenticate,
  ctrl.updateSubscription
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
