const express = require("express");
const ctrl = require("../../controllers/auth");

const {
  validation,
  authenticate,
  isValidId,
  upload,
} = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validation(schemas.registerSchema), ctrl.register);
router.post("/login", validation(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/:id/subscription",
  authenticate,
  isValidId,
  validation(schemas.subscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
