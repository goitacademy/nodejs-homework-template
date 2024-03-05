const express = require("express");
const {
  validateUserSchema,
  validateEmailSchema,
} = require("../../middlewares/validateUser");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/uploadAvatar");
const {
  signUp,
  logIn,
  logOut,
  current,
  uploadAvatar,
  verifyEmail,
  resendVerificationEmail,
} = require("../../service/controllers/userController");

const router = express.Router();

router.post("/signup", validateUserSchema, signUp);
router.post("/login", validateUserSchema, logIn);
router.get("/logout", auth, logOut);
router.get("/current", auth, current);
router.patch("/avatars", auth, upload.single("avatar"), uploadAvatar);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", validateEmailSchema, resendVerificationEmail);

module.exports = router;
