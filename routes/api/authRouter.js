const { Router } = require("express");
const router = Router();

const { authenticate, upload } = require("../../src/middlewares");

const {
  signupController,
  loginController,
  logoutController,
  currentController,
  updateAvatar,
  emailVerification,
  emailReVerification,
} = require("../../src/controllers/authController");

// app.use("/api/auth/users/signup or register... -зарегестрироваться
router.post("/signup", signupController);

// app.use("/api/auth/users/signin or login... -залогиниться, войти
router.post("login", loginController);

router.get("/logout", authenticate, logoutController);

// -текущий
router.get("/current", authenticate, currentController);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

router.get("verify/:verificationToken", emailVerification);

router.post("verify", emailReVerification);

module.exports = { authRouter: router };
