const express = require("express");
const router = express.Router();
const { registerUser, loginUser, verifyEmail } = require("../../controllers/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify/:verificationToken", verifyEmail);

module.exports = router;
