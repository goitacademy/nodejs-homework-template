const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/auth");
const schemas = require("../../models/user");
const { authBothSchema, updateSubscriptionSchema, emailSchema } = schemas;

const { validateBody, authenticate, upload } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

router.post("/register", validateBody(authBothSchema), ctrl.register);
router.post("/verify", validateBody(emailSchema), ctrl.resendVerifyEmail);
router.get("/verify/:verificationCode", ctrl.verifyEmail);
router.post("/login", validateBody(authBothSchema), ctrl.login);
router.get("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.getCurrent);
router.patch(
  "/:userId/subscription",
  authenticate,
  validateBody(updateSubscriptionSchema),
  ctrl.updateSubscriptionById
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
