const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  logout,
  current,
  changeSubscription,
  changeAvatar,
  verifyEmail,
  repeatedVefication,
} = require("../../controllers/auth");
const { validateRegisterBody, auth, upload } = require("../../middlewares");

const {
  schemaSignup,
  schemaSubscription,
  verifySchema,
} = require("../../models/user");

router.post("/signup", validateRegisterBody(schemaSignup), signup);
router.post("/login", validateRegisterBody(schemaSignup), login);
router.post("/verify", validateRegisterBody(verifySchema), repeatedVefication);
router.get("/logout", auth, logout);
router.get("/current", auth, current);
router.get("/verify/:verificationToken", verifyEmail);
router.patch(
  "/subscription",
  auth,
  validateRegisterBody(schemaSubscription),
  changeSubscription
);
router.patch("/avatars", auth, upload.single("avatars"), changeAvatar);
module.exports = router;
