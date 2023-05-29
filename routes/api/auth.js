const express = require("express");
const {
  validateBody,
  authenticate,
  validateSubscription,
  upload,
} = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrentUser);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/",
  authenticate,
  validateSubscription(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
