const express = require("express");
const userCtrl = require("../../controllers/users");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.signup), userCtrl.signup);
router.get("/verify/:verificationToken", userCtrl.verifyEmail);
router.post(
  "/verify",
  validateBody(schemas.emailRequest),
  userCtrl.resendVerification
);
router.get(
  "/restore",
  validateBody(schemas.emailRequest),
  userCtrl.restorePasswordToken
);
router.patch(
  "/restore",
  validateBody(schemas.updatePassword),
  userCtrl.updatePassword
);

router.post("/login", validateBody(schemas.signin), userCtrl.signin);
router.get("/current", authenticate, userCtrl.current);
router.post("/logout", authenticate, userCtrl.logout);

module.exports = router;
