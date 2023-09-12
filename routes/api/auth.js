const express = require("express");
const {
  register,
  login,
  getCurrent,
  logout,
  subscriptionUpdate,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/auth");
const validateBody = require("../../midlewares/validateBody");
const validateResendRequestBody = require("../../midlewares/validateResendRequestBody");
const authentificate = require("../../midlewares/authentificate");
const upload = require("../../midlewares/upload");
const { schemas } = require("../../models/joiSchemasForUser");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);
router.get("/users/verify/:verificationToken", verifyEmail);
router.post(
  "/users/verify",
  validateResendRequestBody(schemas.emailSchema),
  resendVerifyEmail
);
router.post("/login", validateBody(schemas.loginSchema), login);
router.get("/users/current", authentificate, getCurrent);
router.post("/logout", authentificate, logout);
router.patch(
  "/users",
  authentificate,
  validateBody(schemas.subscriptionUpdateSchema),
  subscriptionUpdate
);
router.patch(
  "/users/avatars",
  authentificate,
  upload.single("avatar"),
  updateAvatar
);
module.exports = router;
