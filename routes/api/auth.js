const express = require("express");
const ctrl = require("../../controllers/auth");
const {
  validateBody,validateSubscription, authenticate, upload} = require("../../middlewares");

const { schemas } = require("../../models/userModel");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.registerSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent)
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  ctrl.updateAvatar
);
router.patch(
  "/",
  authenticate,
  validateSubscription(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router
