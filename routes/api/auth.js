const express = require("express");

const {
  registerSchema,
  loginSchema,
  subscriptionSchema,
} = require("../../models/user");

const {
  validation,
  ctrlWrapper,
  authenticate,
  isValid,
  validationSubscrBody,
  upload,
} = require("../../middlewares");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscriptionUser,
  updateAvatar,
} = require("../../controllers");

const router = express.Router();

router.post("/register", validation(registerSchema), ctrlWrapper(register));

router.post("/login", validation(loginSchema), ctrlWrapper(login));

router.get("/current", authenticate, ctrlWrapper(getCurrent));

router.post("/logout", authenticate, ctrlWrapper(logout));

router.patch(
  "/:id/subscription",
  isValid,
  validationSubscrBody(subscriptionSchema),
  ctrlWrapper(updateSubscriptionUser)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

module.exports = router;
