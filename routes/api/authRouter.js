const { Router } = require("express");
const router = Router();

const { authenticate, upload } = require("../../src/middlewares");

const {
  signupController,
  loginController,
  logoutController,
  currentController,
  updateAvatar,
} = require("../../src/controllers/authController");

router.post("/signup", signupController);

router.post("login", loginController);

router.get("/logout", authenticate, logoutController);

router.get("/current", authenticate, currentController);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = { authRouter: router };
