const express = require("express");
const router = express.Router();
const {
  validateBody,
  authenticate,
  upload,
  resize,
} = require("../../middlewares");
const ctrl = require("../../controllers/auth");
const { schemas } = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubSchema),
  ctrl.updateSub
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  resize,
  ctrl.updateAvatar
);

module.exports = router;
