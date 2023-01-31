const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  currentController,
  updateSubscriptionController,
  userVerificationController,
  sendVerifyController,
} = require("../../controllers/auth");
const { tryCatchWrapper } = require("../../helpers");
const { validateBody, authMiddleware } = require("../../middlewares");
const { updateSubscriptionSchema, sendVerifySchema } = require("../../schemas");
const { registerSchema } = require("../../schemas/auth/registerSchema");
const { uploadMiddleware } = require("../../middlewares");
const { avatarController } = require("../../controllers/upload");

const router = express.Router();

router.post(
  "/register",
  validateBody(registerSchema),
  tryCatchWrapper(registerController)
);
router.post(
  "/login",
  validateBody(registerSchema),
  tryCatchWrapper(loginController)
);

router.post("/logout", authMiddleware(), tryCatchWrapper(logoutController));

router.post("/current", authMiddleware(), tryCatchWrapper(currentController));

router.patch(
  "/",
  authMiddleware(),
  validateBody(updateSubscriptionSchema),
  tryCatchWrapper(updateSubscriptionController)
);

router.patch(
  "/avatars",
  authMiddleware(),
  uploadMiddleware.single("avatar"),
  tryCatchWrapper(avatarController)
);

router.get(
  "/verify/:verificationToken",
  tryCatchWrapper(userVerificationController)
);

router.post(
  "/verify",
  validateBody(sendVerifySchema),
  tryCatchWrapper(sendVerifyController)
);

module.exports = { authRouter: router };
