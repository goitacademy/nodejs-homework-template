const express = require("express");
const router = express.Router();
const { registerUser, loginUser, verifyUser, resendVerificationEmail } = require("../../controllers/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify/:verificationToken", verifyUser);
router.post("/verify", resendVerificationEmail);

module.exports = router;
