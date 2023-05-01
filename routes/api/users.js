const express = require("express");
const {
  validation,
  authenticate,
  isUserValidId,
  updateSubscriptionValidation,
  upload,
} = require("../../middlewares");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const {
  registerSchema,
  loginSchema,
  updateSubscriptionSchema,
} = require("../../schemas");
const ctrl = require("../../controllers/users");
const router = express.Router();

router.post(
  "/register",
  validation(registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(loginSchema), ctrlWrapper(ctrl.login));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/:userId/subscription",
  authenticate,
  isUserValidId,
  updateSubscriptionValidation(updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscriptionUser)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
