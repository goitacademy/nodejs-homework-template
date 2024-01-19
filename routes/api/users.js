const express = require("express");
const { authControllers } = require("../../controllers");
const {
  checkRegistrationData,
  checkLoginData,
  protect,
  userupdateava,
} = require("../../middlewares/auth");
const { resendVerifyEmail } = require("../../middlewares/validate");

const router = express.Router();

router.post("/register", checkRegistrationData, authControllers.signup);

router.post("/login", checkLoginData, authControllers.login);

router.get("/verify/:verificationToken", authControllers.verifyEmail);
router.post("/verify", resendVerifyEmail, authControllers.forwardVerification);

router.use(protect);

router.patch("/avatars", userupdateava, authControllers.avatars);

router.post("/logout", authControllers.logout);

router.get("/current", authControllers.getCurrent);

module.exports = router;
