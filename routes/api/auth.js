const express = require("express");
const router = express.Router();

const { validateBody, authenticate, upload } = require("../../middlewares");
const { Schemas } = require("../../models/user");
const {
  register,
  login,
  getCurrent,
  logout,
  ubdateSubscriptaion,
  ubdateAvatar,
  verifyEmail,
  resendVerifuEmail,
} = require("../../controllers/user");

router.post("/register", validateBody(Schemas.registerSchema), register);
router.get("/verify/:verificationCode", verifyEmail);
router.post("/verify", validateBody(Schemas.refreshEmailSchema), resendVerifuEmail);
router.post("/login", validateBody(Schemas.loginSchema), login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch(
  "/subscription",
  authenticate,

  validateBody(Schemas.ubdateSubscriptaion),
  ubdateSubscriptaion
);
router.patch("/avatars", authenticate, upload.single("avatar"), ubdateAvatar);
module.exports = router;
