const express = require("express");
const validateUser = require("../middleware/validation");
const {
  signup,
  login,
  verifyEmail,
  resendVerificationEmail,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", validateUser, signup);
router.post("/login", validateUser, login);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", resendVerificationEmail);

module.exports = router;
